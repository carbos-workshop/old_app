import { Connect } from 'uport-connect'
import Web3 from 'web3'

export const uport = new Connect('Carbos')
const provider = uport.getProvider()
export const web3 = new Web3(provider)
console.log('uport', uport);
console.log('web3', web3);

// export const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
