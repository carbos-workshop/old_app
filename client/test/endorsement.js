const Gaia = artifacts.require("./Gaia.sol");
const Endorsement = artifacts.require("./Endorsement.sol");
const C3 = artifacts.require("./C3.sol");

const truffleAssert = require('truffle-assertions')

const staticC3 = {
  aboveGroundCarbon: "140824208562901730",
  totalCarbon: "7972507037080358000",
  belowGroundCarbon: "20713788410554585000",
  description: "Artificial or Urban Area",
  geometryHash: "0x3c48bb653891728b9dde62c37f95aa4c6063be707afce28aa2acc063e0690812",
  hectares: "351143725575757600",
  latitude: "39612359801573200000",
  longitude: "-104921698900218000000",
  ppt: "420820612455699830",
}

contract('Endorsement', function(accounts) {

  let gaia
  let endorsement

  before( async() => {
    generateC3From = async(address) => {
      let value = (web3.utils.fromWei(staticC3.totalCarbon) * web3.utils.fromWei(staticC3.ppt))/20
      return gaia.genC3(
        staticC3.totalCarbon,
        staticC3.aboveGroundCarbon,
        staticC3.belowGroundCarbon,
        staticC3.hectares,
        staticC3.latitude,
        staticC3.longitude,
        staticC3.ppt,
        staticC3.description,
        staticC3.geometryHash,
        { from: address , value: web3.utils.toWei(value.toString()) })
    }
  })

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

  it("...should not allow other addresses to authorize voters", async () => {
    await truffleAssert.reverts(endorsement.methods.authorize(accounts[2]).send({from: accounts[1]}))
  });

  it("...should allow Gaia to add a Contract for endorsement", async () => {
    let c3Call = await generateC3From(accounts[5])
    c3 = await new web3.eth.Contract(C3.abi, c3Call.logs[0].args[0])
    assert.isOk(c3)
  });

  it("...should not allow other addresses to directly add a Contract for endorsement", async () => {
      await truffleAssert.reverts(endorsement.methods.addContract('test', accounts[2], accounts[1]).send({from: accounts[3]}))
  });

  it("...should allow an authorized voter to vote on a Contract", async () => {
    let c3Call = await generateC3From(accounts[5])
    c3 = await new web3.eth.Contract(C3.abi, c3Call.logs[0].args[0])
    await endorsement.methods.authorize(accounts[3]).send({from: accounts[0]})
    await endorsement.methods.vote(c3._address).send({from: accounts[3]})
    let contractStatus = await endorsement.methods.contracts(c3._address).call()
    assert.equal(contractStatus.count, 1, "endorsement vote from authorized voter not properly registered")
  });

  it("...should not allow other addresses to endorse a Contract", async () => {
    await truffleAssert.reverts(endorsement.methods.vote(c3._address).send({from: accounts[4]}))
  });

  it("...should allow carbos to fully endorse a Contract", async () => {
    let c3Call = await generateC3From(accounts[1])
    c3 = await new web3.eth.Contract(C3.abi, c3Call.logs[0].args[0])
    // await endorsement.methods.authorize(accounts[3]).send({from: accounts[0]})
    // await endorsement.methods.vote(c3._address).send({from: accounts[3]})
    await endorsement.methods.fullyEndorse(c3._address).send({from: accounts[0]})

      // check c3 and escrow for proper results
      
    assert.isOk(false, "test not written")

  });

  it("...should not allow other addresses to fully endorse a Contract", async () => {
    assert.isOk(false, "test not written")
  });

  it("...should release escrow funds when a Contract receives full endorsement from carbos", async () => {
    assert.isOk(false, "test not written")
  });

  it("...should release escrow funds when a Contract receives 5 endorsements from authorized voters", async () => {
    assert.isOk(false, "test not written")
  });

  it("...should update the state of Contract once the Contract is fully endorsed", async () => {
    assert.isOk(false, "test not written")
  });

  it("...should update the state of Contract once the Contract is fully endorsed", async () => {
    assert.isOk(false, "test not written")
  });

});
