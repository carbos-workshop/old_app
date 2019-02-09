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
  usdToEther: (usd, exchangeRate) => {
    if (!exchangeRate) { return usd/100 } //api error set ETH echange rate to ETH=100USD
    return usd/exchangeRate
  },
  etherToUsd: (eth, exchangeRate) => {
    if (!exchangeRate) { return eth * 100 } //api error set ETH echange rate to ETH=100USD
    return exchangeRate * eth
  },
}
