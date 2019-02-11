const truffleAssert = require('truffle-assertions')
const Gaia = artifacts.require("./Gaia.sol");
const C3 = artifacts.require("./C3.sol");

const staticC3 = {
  address: "0x190e03ccbf905f67ca2ad39017bfb09660835ca7",
  aboveGroundCarbon: "140824208562901730",
  totalCarbon: "7972507037080358000",
  belowGroundCarbon: "20713788410554585000",
  description: "Artificial or Urban Area",
  geometryHash: "0x3c48bb653891728b9dde62c37f95aa4c6063be707afce28aa2acc063e0690812",
  hectares: "351143725575757600",
  latitude: "39612359801573200000",
  longitude: "-104921698900218000000",
  raId: "47357",
  ppt: "400820612455699830",
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
        staticC3.raId,
        staticC3.ppt,
        staticC3.description,
        // staticC3.geometryHash,
        web3.utils.toWei(Math.random().toString()), // ensure hashes dont overlap
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

  // it("...should correctly store all params", async () => {
  //   // convert params and match to original object
  // })
  //
  // it("...should be awaitng endorsement", async () => {
  //
  // })
  //
  // it("...should not be buyable until verified", async () => {
  //
  // })
  //
  // it("...should be buyable once verified", async () => {
  //
  // })
  //
  // it("...should correctly transfer value to owner once purchased", async () => {
  //
  // })

  //TODO
  // emit tokens, etc,

});
