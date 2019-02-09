var Gaia = artifacts.require("./Gaia.sol");

contract('Gaia', function(accounts) {

  it("...should be deployed", async () => {
    let gaia = await Gaia.deployed()
    assert.isOk(gaia)
  });

  it("...should set carbos to msg.sender", async () => {
    let gaia = await Gaia.deployed()
    let carbos = await gaia.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })

  it("...test add User", async () => {
      //add a user to the system, with an empty array of c3s
  })

  it("...test addPendingC3", async () => {
      //add a c3 to the pending_c3
      //this should also test if the escrow is made and the c3 is made
  })
  it("...test add multiple C3s and test findAllUserC3()", async () => {
      //this should test the return of all the C3 addresses for a User
  })

});
