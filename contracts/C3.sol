pragma solidity ^0.5;

contract C3 {
    address public seller;
    uint public value;


    constructor(uint _value) public {
      seller = msg.sender;
      value = _value;
    }


}
