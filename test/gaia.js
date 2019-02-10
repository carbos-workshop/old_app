var Gaia = artifacts.require("./Gaia.sol");
var Endorsement = artifacts.require("./Endorsement.sol");
var Escrow = artifacts.require("./Escrow.sol");
var c3Contract = artifacts.require("./C3.sol");

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

  it("...test genC3", async () => {
      let ret = await gaia.genC3(accounts[1], 40, {from: accounts[1], value: web3.utils.toWei('10', 'ether')})
      assert.isOk(ret);
      //add a c3 to the pending_c3
      //this should also test if the escrow is made and the c3 is made
  })

  it("...test add multiple C3s and test findAllUserC3()", async () => {
      //this should test the return of all the C3 addresses for a User
  })

});
