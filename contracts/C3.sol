pragma solidity ^0.5;

contract C3 {
    uint public seller;
    uint public value;


    constructor(uint _value){
      seller = msg.sender;
      value = _value;
    }

    
}
