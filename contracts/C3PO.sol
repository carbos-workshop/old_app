pragma solidity ^0.5;

/*
Carbon Conservation Contract Price Oracle (C3PO)
sets a USD per ton carbon price point that cannot be undercut
this prevents abuse of the deposit system in C3 creatation.
Only Carbos can set this price. We are using USD rather than ETH, because it's much easier to price USD against the current market.
In the future, we may switch this functionality to an oracle.
*/

contract C3PO {

  uint public USDPPT;
  address public carbos;

  event UpdatePPT(
    string updateMessage,
    uint PPT
  );

  constructor() public {
    carbos = msg.sender;
    USDPPT = 50; //50 USD
  }

  modifier carbosOnly(){
      require(msg.sender == carbos);
      _;
  }

  function setUSDPPT(uint PPT) public carbosOnly{
    USDPPT = PPT;
    emit UpdatePPT('Updated USDPPT.', PPT);
  }

}
