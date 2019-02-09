var Gaia = artifacts.require("./Gaia.sol");
var C3PO = artifacts.require("./C3PO.sol");
var Endorsement = artifacts.require("./Endorsement.sol");

module.exports = function(deployer) {
  deployer.deploy(Gaia);
  deployer.deploy(Endorsement);
  deployer.deploy(C3PO);
};
