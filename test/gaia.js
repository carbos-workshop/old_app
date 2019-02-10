var Gaia = artifacts.require("./Gaia.sol");
var Endorsement = artifacts.require("./Endorsement.sol");
var Escrow = artifacts.require("./Escrow.sol");
var C3 = artifacts.require("./C3.sol");

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
  ppt: "420494827446343300",
}

contract('Gaia', function(accounts) {

  let gaia
  let endorser
  let escrow
  let c3
  beforeEach( async () => {
    gaia = await Gaia.deployed({from: accounts[0]})
    let address = await gaia.endorsement()
    endorser = await new web3.eth.Contract(Endorsement.abi, address)
  })

  afterEach( async () => {
    gaia = null
    endorser = null
  })


  it("...should be deployed", async () => {
    assert.isOk(gaia)
  });

  it("...should set carbos to msg.sender", async () => {
    let carbos = await gaia.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })

  it("...endorser should be deployed", async () => {
    assert.isOk(gaia.endorsement())
  })

  it("...test add User", async () => {
      //add a user to the system, with an empty array of c3s
      // console.log(gaia);
      await gaia.addUser("Alek Tutchton", accounts[1],[])
      let user = await gaia.users(accounts[1])
      assert.equal(user, "Alek Tutchton", "successful add to User mapping")
  })

  it("...should generate a C3 after calling genC3", async () => {
      let callGenC3 = await gaia.genC3(
        staticC3.totalCarbon,
        staticC3.aboveGroundCarbon,
        staticC3.belowGroundCarbon,
        staticC3.hectares,
        staticC3.latitude,
        staticC3.longitude,
        staticC3.raId,
        staticC3.ppt,
        staticC3.description,
        staticC3.geometryHash,
        { from: accounts[3] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
      )
      c3 = await new web3.eth.Contract(C3.abi, callGenC3.logs[0].args[0])
      let c3Address = await gaia.c3s(c3._address)
      //cs._address gives c3 addresses
      assert.equal(c3Address, accounts[3], "C3 added to the mapping")
      //add a c3 to the pending_c3
      //this should also test if the escrow is made and the c3 is made
  })

  it("... should add multiple C3s to the mapping C3s", async () => {
    let callGenC3_1 = await gaia.genC3(
      staticC3.totalCarbon,
      staticC3.aboveGroundCarbon,
      staticC3.belowGroundCarbon,
      staticC3.hectares,
      staticC3.latitude,
      staticC3.longitude,
      staticC3.raId,
      staticC3.ppt,
      staticC3.description,
      staticC3.geometryHash,
      { from: accounts[1] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
    )

    c3_1 = await new web3.eth.Contract(C3.abi, callGenC3_1.logs[0].args[0])

    let callGenC3_2 = await gaia.genC3(
      staticC3.totalCarbon,
      staticC3.aboveGroundCarbon,
      staticC3.belowGroundCarbon,
      staticC3.hectares,
      staticC3.latitude,
      staticC3.longitude,
      staticC3.raId,
      staticC3.ppt,
      staticC3.description,
      staticC3.geometryHash,
      { from: accounts[2] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
    )

    c3_2 = await new web3.eth.Contract(C3.abi, callGenC3_2.logs[0].args[0])

    let callGenC3_3 = await gaia.genC3(
      staticC3.totalCarbon,
      staticC3.aboveGroundCarbon,
      staticC3.belowGroundCarbon,
      staticC3.hectares,
      staticC3.latitude,
      staticC3.longitude,
      staticC3.raId,
      staticC3.ppt,
      staticC3.description,
      staticC3.geometryHash,
      { from: accounts[3] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
    )

    c3_3 = await new web3.eth.Contract(C3.abi, callGenC3_3.logs[0].args[0])
    let address_1 = await gaia.c3s(c3_1._address)
    let address_2 = await gaia.c3s(c3_2._address)
    let address_3 = await gaia.c3s(c3_3._address)
    // console.log(address_1,"previous test")
    let ret = false
    if(address_1 == accounts[1] && address_2 == accounts[2] && address_3 == accounts[3]){
      ret = true
    }
    assert.equal(ret, true,"all c3 addresses were mapped correctly")

  })

  it("...test add multiple C3s and test findAllUserC3()", async () => {
    let callGenC3_1 = await gaia.genC3(
      staticC3.totalCarbon,
      staticC3.aboveGroundCarbon,
      staticC3.belowGroundCarbon,
      staticC3.hectares,
      staticC3.latitude,
      staticC3.longitude,
      staticC3.raId,
      staticC3.ppt,
      staticC3.description,
      staticC3.geometryHash,
      { from: accounts[0] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
    )

    c3_1 = await new web3.eth.Contract(C3.abi, callGenC3_1.logs[0].args[0])
    let callGenC3_2 = await gaia.genC3(
      staticC3.totalCarbon,
      staticC3.aboveGroundCarbon,
      staticC3.belowGroundCarbon,
      staticC3.hectares,
      staticC3.latitude,
      staticC3.longitude,
      staticC3.raId,
      staticC3.ppt,
      staticC3.description,
      staticC3.geometryHash,
      { from: accounts[0] , value: web3.utils.toWei('2', 'ether')} //TODO fix hardcoded 2 ether
    )

    c3_2 = await new web3.eth.Contract(C3.abi, callGenC3_2.logs[0].args[0])
    let usersC3s = await gaia.findAllUserC3(accounts[2])
    let address1 = c3_1._address
    let address2 = c3_2._address
    let ret = false
    console.log(usersC3s, "next test")
    if(usersC3s[0]== address1 && usersC3s[1] == address2){
      ret = true
    }
    //assert.equal(ret, true, "The User's mapping of c3s worked correctly")
    })

});
