const epsg = require('epsg-index/all.json')
const proj4 = require('proj4')
const leadingEPSG = /^epsg:/i

export default {
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
  coordinateSystem: (from, to) => {
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
}
