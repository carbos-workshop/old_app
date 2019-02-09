var Gaia = artifacts.require("./Gaia.sol");

contract('Gaia', function(accounts) {

  it("...should be deployed", async () => {
    let gaia = await Gaia.deployed()
    assert.isOk(gaia)
  });

  it("...should set carbos to deployer address", async () => {
    let gaia = await Gaia.deployed()
    let carbos = await gaia.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })


});
