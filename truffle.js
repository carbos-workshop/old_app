const HDWallerProvider = require('truffle-hdwallet-provider')
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  contracts_build_directory: "./src/abis",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function(){
        return new HDWallerProvider( process.env.INFURA_MNEMONIC, process.env.INFURA_API )
      },
      network_id: 4,
    }
  }
};
