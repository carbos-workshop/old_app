pragma solidity ^0.4.24;

contract Escrow {
  enum State{AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, FAILED};
  State public current_state;

  address public buyer;
  address public seller;
  address public arbiter;

  modifier onlyBuyer() {
    require(msg.sender == buyer || msg.sender == arbiter);
    _;
  }

  modifier sellerOnly(){
    require(msg.sender == seller || msg.sender == arbiter);
    _;
  }

  modifier inState(State expected_state){
    require(current_state == expected_state);
    _;
  }

  constructor(address _buyer, address _seller, address _arbiter) public {
      buyer   = _buyer;
      seller  = _seller;
      arbiter = _arbiter;
  }

  function sendPayment() public payable onlyBuyer inState(State.AWAITING_PAYMENT) {
      current_state = State.AWAITING_DELIVERY;
  }

  function confirmDelivery() public onlyBuyer inState(State.AWAITING_DELIVERY) {
    current_state = State.COMPLETE;
    seller.transfer(address(this).balance);
  }

  function refundBuyer() public sellerOnly {
    current_state = State.FAILED;
    buyer.transer(address(this).balance);
  }
}
