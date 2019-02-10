pragma solidity ^0.5;

/*
Carbon Conservation Contract Price Oracle (C3PO)
sets a USD per ton carbon price point that cannot be undercut
this prevents abuse of the deposit system in C3 creatation.
Only Carbos can set this price. We are using USD rather than ETH, because it's much easier to price USD against the current market.
In the future, we may switch this functionality to an oracle.
*/
import './Oraclize.sol';

contract C3PO is usingOraclize {

  uint public USDPPT;
  uint public ETHPPT;
  uint public ETHConversionRate;
  address public carbos;
  event LogNewETHConversionRate(uint ETHConversionRate);
  event LogNewOraclizeQuery(string description);
  event LogNewUSDPPT(uint PPT);
  event LogNewETHPPT(uint PPT);

  constructor() public {
    carbos = msg.sender;
    USDPPT = 50; //50 USD
    // update(); // Update price on contract creation...
  }

  modifier carbosOnly(){
      require(msg.sender == carbos);
      _;
  }

  function setUSDPPT(uint PPT) public carbosOnly{
    USDPPT = PPT;
    emit LogNewUSDPPT(PPT);
  }

  // function __callback(bytes32 myid, string memory result, bytes memory proof) public {
  //     require(msg.sender == oraclize_cbAddress());
  //     update(); // Recursively update the price stored in the contract...
  //     ETHConversionRate = parseInt(result);
  //     emit LogNewETHConversionRate(ETHConversionRate);
  //     ETHPPT = ETHConversionRate * USDPPT;
  //     emit LogNewETHPPT(ETHPPT);
  // }
  //
  // function update() public payable {
  //     if (oraclize_getPrice("URL") > address(this).balance) {
  //         emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee!");
  //     } else {
  //         emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer...");
  //         oraclize_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0");
  //     }
  // }

}
