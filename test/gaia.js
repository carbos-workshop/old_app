var Gaia = artifacts.require("./Gaia.sol");
var C3 = artifacts.require("./C3.sol");
var C3PO = artifacts.require("./C3PO.sol");

const BN = web3.utils.BN;
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
  // raId: "47357",
  ppt: "400820612455699830",
}

contract('Gaia', function(accounts) {

  let gaia
  let endorser
  let escrow
  let c3
  before( async () => {
    gaia = await Gaia.deployed({from: accounts[0]})
    // let address = await gaia.endorsement()
    // endorser = await new web3.eth.Contract(Endorsement.abi, address)

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
        { from: address , value: web3.utils.toWei(value.toString()) })
    }

  })

  it("...should be deployed", async () => {
    assert.isOk(gaia)
  });

  it("...should set carbos to msg.sender", async () => {
    let carbos = await gaia.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })

  // it("...should be deploy an endorsement contract", async () => {
  //   assert.isOk(gaia.endorsement())
  // })

  it("...should be deploy a C3PO contract", async () => {
    let c3poAddress = await gaia.c3po()
    c3po = await new web3.eth.Contract(C3PO.abi, c3po)
    assert.isOk(c3po)
  })

  // it("...should set carbos address in endorsement contract", async () => {
  //   let carbos = await gaia.carbos()
  //   let endorsementCarbos = await endorser.methods.carbos().call()
  //   assert.equal(carbos, endorsementCarbos, "carbos address set in endorsement Contract")
  // })

  it("...should generate a C3 after calling genC3", async () => {
    let callGenC3 = await generateC3From(accounts[3])
    c3 = await new web3.eth.Contract(C3.abi, callGenC3.logs[0].args[0])
    assert.isOk(c3)
  })

  it("...should reject C3 with geometryHashes that have already been submitted", async () => {
    assert.isOk(false, "test not written")
  })

  // it("...should generate an Escrow acount after calling genC3", async () => {
  //   let callGenC3 = await generateC3From(accounts[3])
  //   escrow = await new web3.eth.Contract(Escrow.abi, callGenC3.logs[0].args[1])
  //   assert.isOk(escrow)
  // })

  // it("...should store the proper deposit amount in the generated Escrow account after calling genC3", async () => {
  //   let expectedDeposit = (web3.utils.fromWei(staticC3.totalCarbon) * web3.utils.fromWei(staticC3.ppt))/20
  //   let callGenC3 = await generateC3From(accounts[3])
  //   escrow = await new web3.eth.Contract(Escrow.abi, callGenC3.logs[0].args[1])
  //   let balance = await web3.eth.getBalance(escrow._address)
  //   assert.equal(expectedDeposit, web3.utils.fromWei(balance), "Escrow account does not have the expected deposit amount")
  // })


  it("...should map multiple C3 addresses to their deployers", async () => {
    let firstC3Call = await generateC3From(accounts[1])
    let firstC3 = await new web3.eth.Contract(C3.abi, firstC3Call.logs[0].args[0])

    let secondC3Call = await generateC3From(accounts[2])
    let secondC3 = await new web3.eth.Contract(C3.abi, secondC3Call.logs[0].args[0])

    let address1 = await gaia.c3s(firstC3._address)
    let address2 = await gaia.c3s(secondC3._address)

    assert.equal((
      address1 === accounts[1]
      && address2 === accounts[2]
    ), true, "c3 addresses were not mapped correctly to deployer addresses by Gaia")
  })

  it("...should allow users to lookup their C3s", async () => {
    let firstC3Call = await generateC3From(accounts[6])
    let firstC3 = await new web3.eth.Contract(C3.abi, firstC3Call.logs[0].args[0])

    let secondC3Call = await generateC3From(accounts[6])
    let secondC3 = await new web3.eth.Contract(C3.abi, secondC3Call.logs[0].args[0])

    let res = await gaia.getUsersC3(accounts[6])

    let address1 = firstC3._address
    let address2 = secondC3._address

    assert.equal((address1 === res[0] && address2 === res[1]), true, "returns all users C3s")
  })

  it("...should be able to lookup all C3s", async () => {
     gaia = await Gaia.new({from: accounts[0]})
     let firstC3Call = await generateC3From(accounts[1])
     let firstC3 = await new web3.eth.Contract(C3.abi, firstC3Call.logs[0].args[0])

     let secondC3Call = await generateC3From(accounts[1])
     let secondC3 = await new web3.eth.Contract(C3.abi, secondC3Call.logs[0].args[0])

     let allC3s = await gaia.getAllC3s()
     assert.equal((
       allC3s[0] === firstC3._address
       && allC3s[1] === secondC3._address
       && allC3s.length === 2
     ), true, "all C3s found")
   })

});
