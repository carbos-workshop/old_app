const axios = require( 'axios')
// import jsonp from 'jsonp'
//required for EPA Biomass map projection
const epsg = require( 'epsg-index/all.json')
const proj4 = require( 'proj4')
const C3PO = require( '../abis/C3PO.json')
const convert =
  {
      acresToSquareMeters: acres => {
      return acres * 4046.856
    },
    acresToSquareMiles: acres => {
      return acres/640
    },
    gramsToTons: g => {
      return g/1000000
    },
    kilogramsToTons: kg => {
      return kg/1000
    },
    squareFeetToAcres: sqft => {
      return sqft/43560
    },
    teragramsToTons: tg => {
      return tg * 1000000
    },
    usdToEther: (usd, exchangeRate) => {
      if (!exchangeRate) { return usd/100 } //api error set ETH echange rate to ETH=100USD
      return usd/exchangeRate
    },
    etherToUsd: (eth, exchangeRate) => {
      if (!exchangeRate) { return eth * 100 } //api error set ETH echange rate to ETH=100USD
      return exchangeRate * eth
    }
}

const latitude = 38.060580;
const longitude = -102.671025;

const soilGridsBaseURL = 'https://rest.soilgrids.org/query?'
const ecologicalLandUnitsBaseURL = 'https://rmgsc.cr.usgs.gov/arcgis/rest/services/globalelus/MapServer/identify?'
const epaBiomassBaseURL = 'https://geodata.epa.gov/arcgis/rest/services/ORD/ROE_BiomassPerSquareMile/MapServer/identify?'
const transform = convertCoordinateSystem('EPSG:4326', '3857')
function convertCoordinateSystem(from, to) {
  const leadingEPSG = /^epsg:/i
  if ('string' !== typeof from) throw new Error('from must be a string')
  from = from.replace(leadingEPSG, '')
  const fromEPSG = epsg[from]
  if (!fromEPSG) throw new Error(from + ' is not a valid EPSG coordinate system')

  if ('string' !== typeof to) throw new Error('to must be a string')
  to = to.replace(leadingEPSG, '')
  const toEPSG = epsg[to]
  if (!toEPSG) throw new Error(to + ' is not a valid EPSG coordinate system')

  return proj4(fromEPSG.proj4, toEPSG.proj4)
}

//get soil information from Soil Grids API based on lat lng point
 function getSoilCarbon(lat, lng){
  //return new Promise( (resolve,reject) => {resolve(soilGrids)})
   return axios.get(`${soilGridsBaseURL}lon=${lng}&lat=${lat}&attributes=ORCDRC,BLDFIE`)
}

 function getEcologicalLandUnits(lat, lng){
  return axios.get(`${ecologicalLandUnitsBaseURL}geometry=${lng},${lat}&tolerance=0&layers=all&mapExtent=--180.0000000000001,-56.00013888888891,179.99999999999926,83.62486111111086&imageDisplay=4096,4096,96&f=json`)
}

 function getBiomass(lat, lng){
  //convert lat/lng strings to numbers then to web mercarder format

  let x = parseFloat(lng);
  let y = parseFloat(lat);
  let coords = transform.forward({x: x, y: y})
  //Nathan's chrome has problems with this request due to Same Origin CORS Policy
  return axios.get(`${epaBiomassBaseURL}geometryType=esriGeometryPoint&geometry=${coords.x},${coords.y}&tolerance=0&layers=all&mapExtent=-19942592.3656,2819924.171599999,20012846.0377,11523911.8453&imageDisplay=4096,4096,96&f=json`)

  //JSONP request to get around CORS issue in chrome for this API
  // WARNING: this seemed to make no difference in chrome
  // return new Promise((resolve,reject) =>{
  //    jsonp(`${epaBiomassBaseURL}geometryType=esriGeometryPoint&geometry=${coords.x},${coords.y}&tolerance=0&layers=all&mapExtent=-19942592.3656,2819924.171599999,20012846.0377,11523911.8453&imageDisplay=4096,4096,96&f=json`, null, (err, data) => {
  //     if (err) {
  //       resolve(err)
  //     } else {
  //       resolve(data)
  //     }
  //   })
  //  })
}

function calculateBelowGroundCarbon (area, data) {
  //average the BLDFIE densities across soil slices and multiply by slice volume to get kg soil per 'slice'
  //then average ORCDRC ermilles across the 'slice' height take the permille of the 'slice'
  let slice1 = ((data.BLDFIE.M.sl1 + data.BLDFIE.M.sl2)/2) * (convert.acresToSquareMeters(area) * .05) * (((data.ORCDRC.M.sl1 + data.ORCDRC.M.sl2)/2)/1000)
  let slice2 = ((data.BLDFIE.M.sl2 + data.BLDFIE.M.sl3)/2) * (convert.acresToSquareMeters(area) * .1) * (((data.ORCDRC.M.sl2 + data.ORCDRC.M.sl3)/2)/1000)
  let slice3 = ((data.BLDFIE.M.sl3 + data.BLDFIE.M.sl4)/2) * (convert.acresToSquareMeters(area) * .15) * (((data.ORCDRC.M.sl3 + data.ORCDRC.M.sl4)/2)/1000)
  return convert.kilogramsToTons(slice1 + slice2 + slice3) * .9 //TEMP * .9 temp band aid to subtract out soil coarse fragments
}

function calculateAboveGroundCarbon (area, ratio) {
  //very "alpha" approximate carbon/weight ratio calc
  return convert.teragramsToTons(convert.acresToSquareMiles(area) * ratio) * 0.47
}

getSoilCarbon(latitude, longitude)
  .then(res => {
    console.log('soil carbon: ', calculateBelowGroundCarbon(13000, res.data.properties), 'tons')
  })
getBiomass(latitude, longitude)
  .then(res => {
    console.log('biomass: ', calculateAboveGroundCarbon(13000, 0.003695))
  })
// getEcologicalLandUnits(latitude, longitude)
//   .then( res => {
//     console.log('ELUs:  ', res.data.results[1], attributes.ELU)
//   })
