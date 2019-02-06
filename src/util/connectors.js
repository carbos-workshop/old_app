import { Connect } from 'uport-connect'
import Web3 from 'web3'

export const uport = new Connect('Carbos')
// const provider = uport.getProvider()
// console.log('uport', uport);

export async function connectToMetaMask() {
  console.log('conneting to metamask');
  // Modern dapp browsers...
  if (window.ethereum) {
      console.log('located window.ethereum')
      // window.web3 = new Web3(ethereum);
      try {
        console.log('opening metamask async')
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
      console.log('opening metamask legacy')
      window.web3 = new Web3(window.web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return false
  }
}
