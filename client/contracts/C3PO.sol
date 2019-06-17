pragma solidity ^0.5;

/*
Carbon Conservation Contract Price Oracle (C3PO)
sets a USD per ton carbon price point that cannot be undercut
this prevents abuse of the deposit system in C3 creatation.
Only Carbos can set this price. We are using USD rather than ETH, because it's much easier to price USD against the current market.
In the future, we may switch this functionality to an oracle.
*/

contract C3PO {

  uint256 public USDPPT;
  uint256 public ETHPPT;
  uint256 public ETHConversionRate;
  address public carbos;
  event LogNewUSDPPT(uint PPT);
  event LogNewETHPPT(uint PPT);

  constructor() public {
    carbos = msg.sender;
    USDPPT = 30; //50 USD
    //update conversion rate
    ETHConversionRate = 120; //TEMP -> TODO UPDATE() TO ORACLE
    setETHPPT();
  }

  modifier carbosOnly(){
      require(msg.sender == carbos);
      _;
  }

  function setETHPPT() internal {
     ETHPPT = (USDPPT*10**18) / ETHConversionRate;
     emit LogNewETHPPT(ETHPPT);
  }

  function setUSDPPT(uint PPT) public carbosOnly{
    USDPPT = PPT;
    //Update conversion rate
    setETHPPT();
    emit LogNewUSDPPT(PPT);
  }

}
