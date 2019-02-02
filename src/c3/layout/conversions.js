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
  squareFeetToAcres: sqft => {
    return sqft/43560
  },
  teragramsToTons: tg => {
    return tg * 1000000
  },
}
