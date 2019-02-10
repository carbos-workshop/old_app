const truffleAssert = require('truffle-assertions')
const Gaia = artifacts.require("./Gaia.sol");
const C3 = artifacts.require("./C3.sol");

contract('C3', function(accounts) {

  let gaia
  let c3
  beforeEach( async () => {
    gaia = await Gaia.deployed({ from : accounts[0] })
    // send a c3, get address
    // c3 = await new web3.eth.Contract(Endorsement.abi, address)
  })

  it("...should be deployed", async () => {
    assert.isOk(c3)
  })

});
