const truffleAssert = require('truffle-assertions')
const Gaia = artifacts.require("./Gaia.sol");
const Escrow = artifacts.require("./Escrow.sol");

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

contract('Escrow', function(accounts) {

  let gaia
  let escrow
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
        { from: address , value: web3.utils.toWei(value.toString())
      })
    }
    let callGenC3 = await generateC3From(accounts[3])
    escrow = await new web3.eth.Contract(Escrow.abi, callGenC3.logs[0].args[1])
  })

  beforeEach( async () => {
    let c3Call = await generateC3From(accounts[5])
    c3 = await new web3.eth.Contract(Escrow.abi, c3Call.logs[0].args[0])
  })

  it("...should be deployed", async () => {
    assert.isOk(escrow)
  })

  it("...should contain the correct balance", async () => {

  })

  it("...should set carbos to the proper address", async () => {

  })

  it("...should set deployed to the proper address", async () => {

  })

  it("...should set the proper expiry and forfeit dates", async () => {

  })

  it("...should be awaiting endorsement", async () => {

  })

  it("...should not allow addresses to transfer the balance", async () => {

  })

  it("...should not allow addresses call cancel()", async () => {

  })

  it("...should not allow addresses call forfeit()", async () => {

  })

  it("...should allow carbos to call cancel() and retreive deposit", async () => {

  })

  // ensure Escrow is not destroyed from previous test

  it("...should not allow carbos to call forfiet() before forfeit date", async () => {

  })


});
