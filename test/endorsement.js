const Gaia = artifacts.require("./Gaia.sol");
const Endorsement = artifacts.require("./Endorsement.sol");

const truffleAssert = require('truffle-assertions')

contract('Endorsement', function(accounts) {

  let gaia
  let endorsement
  beforeEach( async () => {
    gaia = await Gaia.deployed({ from : accounts[0] })
    let address = await gaia.endorsement()
    endorsement = await new web3.eth.Contract(Endorsement.abi, address)
  })

  afterEach( async () => {
    gaia = null
    endorsement = null
  })

  it("...should be deployed", async () => {
    assert.isOk(endorsement)
  });

  it("...should set gaia address to Gaia", async () => {
    let deployedFromAddress = await endorsement.methods.gaia().call()
    let gaiaAddress = await gaia.address
    assert.equal(deployedFromAddress, gaiaAddress, "Did not set Gaia address correctly when deploying.")
  });

  it("...should set carbos address to carbos", async () => {
    let carbosAddressEndorse = await endorsement.methods.carbos().call()
    let carbosAddressGaia = await gaia.carbos()
    assert.equal(carbosAddressEndorse, carbosAddressGaia, "Did not set Carbos address correctly when deploying.")
  });

  it("...should set allow carbos to set carbos as an authorized voter", async () => {
    let voter = await endorsement.methods.voters(accounts[0]).call()
    assert.equal(voter, true, "Carbos address was not authorized to vote.")
  });
  //
  it("...should allow carbos to authorize other addresses", async () => {
    await endorsement.methods.authorize(accounts[1]).send({from: accounts[0]})
    let voter = await endorsement.methods.voters(accounts[1]).call()
    assert.equal(voter, true, "Carbos address was not able to authorize other addresses to vote.")
  });
  //
  it("...should not allow other addresses to authorize voters", async () => {
    await truffleAssert.reverts(endorsement.methods.authorize(accounts[2]).send({from: accounts[1]}))
  });

  // it("...should allow Gaia to add a Contract for endorsement", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should not allow other addresses to add a Contract for endorsement", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should allow an authorized voter to endorse a Contract", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should not allow other addresses to endorse a Contract", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should not allow carbos to fully endorse a Contract", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should not allow other addresses to fully endorse a Contract", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should release escrow funds when a Contract receives full endorsement from carbos", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should release escrow funds when a Contract receives 5 endorsements from authorized voters", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should update the state of Contract once the Contract is fully endorsed", async () => {
  //   assert.isOk(false, "Test not written.")
  // });
  //
  // it("...should update the state of Contract once the Contract is fully endorsed", async () => {
  //   assert.isOk(false, "Test not written.")
  // });

});
