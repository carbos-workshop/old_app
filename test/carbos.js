const Carbos = artifacts.require("./Carbos.sol");
const BN     = web3.utils.BN;


contract('Carbos', function(accounts) {

let carbos
const expectedCarbos = {
    receptNum: new BN(0),
    parentContract: accounts[0],
    carbonValue: new BN(12),
}

beforeEach( async () => {
  carbos = await Carbos.deployed({from: accounts[0]})
})

  it("...should be deployed", async () => {
    assert.isOk(carbos)
  })

  it("...create first Carbos Recept", async () => {
    let res = await carbos.createCarbos(accounts[1], 12)
    res = await carbos.activeCarbos(0)
    console.log(res)

    assert.deepEqual(res, expectedCarbos, "creation returned true")
  })

  it("...")
});
