import { Connect } from 'uport-connect'

export let uport = new Connect('Carbos')
export const web3 = uport.getWeb3()
