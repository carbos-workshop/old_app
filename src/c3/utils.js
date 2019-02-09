import convert from './conversions'

export function calculateActualLandArea(total, building) {
    if (building) {
      return total - convert.squareFeetToAcres(building)
    }
    else {
      console.log('No building footprint provided to calculate actual land area.')
      return total
    }
  }

export function calculateDeposit(totalTonsCarbon, ppt){
  if (!totalTonsCarbon || !ppt){
    return 0
  }
  return (totalTonsCarbon * ppt * 0.05) //5% deposit
}
