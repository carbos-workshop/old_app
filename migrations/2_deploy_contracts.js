var Gaia = artifacts.require("./Gaia.sol");
var C3PO = artifacts.require("./C3PO.sol");
var Carbos =artifacts.require("./Carbos.sol");
// var Oraclize = artifacts.require('./Oraclize.sol');

module.exports = function(deployer, accounts) {
  deployer.deploy(Gaia);
  // deployer.deploy(Oraclize);
  const carbos = accounts[0];
  const gaia  = accounts[1];
  deployer.deploy(C3PO);
  deployer.deploy(Carbos, "Test", "OCO");
};
