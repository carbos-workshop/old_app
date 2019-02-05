import epsg from 'epsg-index/all.json'
import proj4 from 'proj4'
import {
  getEthExchangeRate
} from './requests'

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
  },
  usdToEther: usd => {
    // return new Promise(resolve => {
    return getEthExchangeRate()
      .then(res => {
        return usd/res.data[0].price_usd
      })
    // })
  },
  etherToUsd: eth => {
    return getEthExchangeRate()
      .then(res => {
        return res.data[0].price_usd * eth
      })
  }
}
