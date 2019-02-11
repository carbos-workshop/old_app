var Gaia = artifacts.require("./Gaia.sol");
var C3PO = artifacts.require("./C3PO.sol");
// var Oraclize = artifacts.require('./Oraclize.sol');

module.exports = function(deployer) {
  deployer.deploy(Gaia);
  // deployer.deploy(Oraclize);
  deployer.deploy(C3PO);
};
