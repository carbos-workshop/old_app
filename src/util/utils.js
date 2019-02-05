export function trimDecimals(number, length) {
  return Number.parseFloat(number).toFixed((length || 2))
}
