import { Connect } from 'uport-connect'
import Web3 from 'web3'

export const uport = new Connect('Carbos')
const provider = uport.getProvider()
export const web3 = new Web3(provider)
// console.log('uport', uport);

export async function connectToMetaMask() {
  // Modern dapp browsers...
  if (window.ethereum) {
      // window.web3 = new Web3(ethereum);
      try {
          // Request account access if needed
        return await window.ethereum.enable()

      } catch (error) {
          // User denied account access...
          console.log(error);
          return false
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return false
  }
}
