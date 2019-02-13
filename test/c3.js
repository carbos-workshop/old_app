const truffleAssert = require('truffle-assertions')
const Gaia = artifacts.require("./Gaia.sol");
const C3 = artifacts.require("./C3.sol");
const Endorsement = artifacts.require("./Endorsement.sol");
const Escrow = artifacts.require("./Escrow.sol");

const staticC3 = {
  // address: "0x190e03ccbf905f67ca2ad39017bfb09660835ca7",
  aboveGroundCarbon: "140824208562901730",
  totalCarbon: "7972507037080358000",
  belowGroundCarbon: "20713788410554585000",
  description: "Artificial or Urban Area",
  geometryHash: "0x3c48bb653891728b9dde62c37f95aa4c6063be707afce28aa2acc063e0690812",
  hectares: "351143725575757600",
  latitude: "39612359801573200000",
  longitude: "-104921698900218000000",
  // raId: "47357",
  ppt: "420820612455699830",
}

contract('C3', function(accounts) {

  let gaia
  let c3
  before( async () => {
    gaia = await Gaia.deployed({ from : accounts[0] })
    generateC3From = async(address) => {
      let value = (web3.utils.fromWei(staticC3.totalCarbon) * web3.utils.fromWei(staticC3.ppt))/20
      return gaia.genC3(
        staticC3.totalCarbon,
        staticC3.aboveGroundCarbon,
        staticC3.belowGroundCarbon,
        staticC3.hectares,
        staticC3.latitude,
        staticC3.longitude,
        // staticC3.raId,
        staticC3.ppt,
        staticC3.description,
        staticC3.geometryHash,
        // web3.utils.toWei(Math.random().toString()), // ensure hashes dont overlap
        { from: address , value: web3.utils.toWei(value.toString()) })
    }
  })

  beforeEach( async () => {
    let c3Call = await generateC3From(accounts[5])
    c3 = await new web3.eth.Contract(C3.abi, c3Call.logs[0].args[0])
  })

  it("...should be deployed", async () => {
    assert.isOk(c3)
  })

  it("...should correctly store all static params", async () => {
    // convert params and match to original object
    let expectedValues = {
      totalCarbon: await c3.methods.totalCarbon().call(),
      aboveGroundCarbon: await c3.methods.aboveGroundCarbon().call(),
      belowGroundCarbon: await c3.methods.belowGroundCarbon().call(),
      hectares: await c3.methods.hectares().call(),
      latitude: await c3.methods.latitude().call(),
      longitude: await c3.methods.longitude().call(),
      ppt: await c3.methods.ppt().call(),
      description: await c3.methods.description().call(),
      geometryHash: await c3.methods.geometryHash().call(),
    }
    let c3Values = staticC3
    delete c3Values.address //set by gaia
    assert.deepEqual(expectedValues, c3Values, "not equal")
  })

  it("...should be awaitng endorsement", async () => {
    let state = await c3.methods.currentState().call()
    assert.equal(state, 0, "C3 not intialized in AWAITING_ENDORSEMENT state")
  })

  it("...should enter verified state once endorsed", async () => {
    let endorserAddress = await c3.methods.endorser().call()
    // console.log(endorserAddress);
    let endorser = await new web3.eth.Contract(Endorsement.abi, endorserAddress)
    //contract exists in endorsement mapping
    let test = await endorser.methods.contracts(c3._address).call()

    //escrow address tored in endorser
    // let escrow = await new web3.eth.Contract(Escrow.abi, test.escrow)
    // let test2 = await escrow.methods.endorser().call()
    // console.log(test2);
    let endorsement = await endorser.methods.fullyEndorse(c3._address).call({from: accounts[0]})
    let state = await c3.methods.currentState().call()
    console.log(state);
    assert.equal(state, 1,"C3 did not enter verified state when endorsed")
  })

  it("...should be buyable once verified", async () => {
    assert.isOk(false, "test not written")
  })

  it("...should correctly transfer value to owner once purchased", async () => {
    assert.isOk(false, "test not written")
  })

  it("...should return an integer value when passed a negative longitude", async () => {
    let long = await c3.methods.longitude().call()
    assert.equal(staticC3.longitude, long, "did not store a negative longitude correctly")
  })

});
