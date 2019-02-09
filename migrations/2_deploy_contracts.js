var Gaia = artifacts.require("./Gaia.sol");
var C3PO = artifacts.require("./C3PO.sol");

module.exports = function(deployer) {
  deployer.deploy(Gaia);
  deployer.deploy(C3PO);
};
