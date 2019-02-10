const truffleAssert = require('truffle-assertions')
// var Oraclize = artifacts.require("./Oraclize.sol");
var C3PO = artifacts.require("./C3PO.sol");

const BN = web3.utils.BN;
// function getNumber(number){
//   if (web3.utils.isBigNumber(number)){
//     return number.toString()
//   } else return number
// }

contract('C3PO', function(accounts) {

  let c3po
  beforeEach( async () => {
    c3po = await C3PO.deployed({ from : accounts[0]})
    // oraclize = await Oraclize.deployed({ from : accounts[0]})
  })


  it("...should be deployed", async () => {
    assert.isOk(c3po)
  })

  it("...should set carbos to msg.sender", async () => {
    let carbos = await c3po.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })

  it("...should initialize USDPPT to 50", async () => {
    let usdppt = await c3po.USDPPT()
    assert.equal(usdppt.toNumber(), 50, "Did not properly initialize USPPT")
  })

  it("...should not allow other accounts to change USDPPT", async () => {
      await truffleAssert.reverts(c3po.setUSDPPT(80, { from: accounts[1] }))
  })

  it("...should allow carbos to change USDPPT", async () => {
    let usdppt = c3po.setUSDPPT(80, { from: accounts[0] })
    let newppt = await c3po.USDPPT()
    assert.equal(newppt.toNumber(), 80, "Does not allow carbos to change USDPPT")
  })

  it("...should return a ppt value in ETH", async () => {
    let usdppt = c3po.setUSDPPT(50, { from: accounts[0] })
    let ethppt = await c3po.ETHPPT();
    ethppt = web3.utils.fromWei(ethppt.toString());
    let expected = web3.utils.fromWei(web3.utils.toWei('0.416666666666666666'));
    assert.equal(ethppt, expected,"Does not return a valid ETHPPT")
  })

});
