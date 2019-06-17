const truffleAssert = require('truffle-assertions')
// var Oraclize = artifacts.require("./Oraclize.sol");
var C3PO = artifacts.require("./C3PO.sol");

// const BN = web3.utils.BN;

contract('C3PO', function(accounts) {

  before( async () => {
    c3po = await C3PO.deployed({ from : accounts[0]})
  })


  it("...should be deployed", async () => {
    assert.isOk(c3po)
  })

  it("...should set carbos to msg.sender", async () => {
    let carbos = await c3po.carbos()
    assert.equal(carbos, accounts[0], "Did not set carbos to msg.sender")
  })

  it("...should initialize USDPPT to 30", async () => {
    let usdppt = await c3po.USDPPT()
    assert.equal(usdppt.toNumber(), 30, "Did not properly initialize USPPT")
  })

  it("...should return an ETHPPT value", async () => {
    //expects USDPPT to be 50 and ETH Exchange rate to be 120
    //only checks 6 decimals
    let ethppt = await c3po.ETHPPT();
    ethppt = web3.utils.fromWei(ethppt.toString());
    let expected = web3.utils.fromWei(web3.utils.toWei((30/120).toString()));
    expected = Math.round(expected * 1000000) / 1000000
    ethppt = Math.round(ethppt * 1000000) / 1000000
    assert.equal(ethppt, expected,"Does not return a valid ETHPPT")
  })

  it("...should not allow other accounts to change USDPPT", async () => {
      await truffleAssert.reverts(c3po.setUSDPPT(80, { from: accounts[1] }))
  })

  it("...should allow carbos to change USDPPT", async () => {
    let usdppt = c3po.setUSDPPT(80, { from: accounts[0] })
    let newppt = await c3po.USDPPT()
    assert.equal(newppt.toNumber(), 80, "Does not allow carbos to change USDPPT")
  })


});
