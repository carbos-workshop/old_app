export function trimDecimals(number, length) {
  return Number.parseFloat(number).toFixed((length || 2))
}

export function createTransactionObject(){
    return {
      to: '0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347',
      value: '0.069',
      fn: "setStatus(string 'Testy McTestFace', bytes32 '0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347')",
      appName: 'Carbos'
    }
}
