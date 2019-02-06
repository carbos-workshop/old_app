import { web3 } from './connectors'

export function trimDecimals(number, length) {
  return Number.parseFloat(number).toFixed((length || 2))
}

export function createTransactionObject(){
    // return {
    //   // from: 'did:ethr:0x60ffc1a9ed87bd44cd5c1bf43b16e7a7a70c0de9',
    //   to: '0x7bb53B80ccA74eEC085c93995Fb72a7057bb53aa',//'0xc3245e75d3ecd1e81a9bfb6558b6dafe71e9f347',
    //   value: web3.utils.toWei('1', 'ether'),
    //   net: '0x4',
    //   appName: 'Carbos'
    // }
}
