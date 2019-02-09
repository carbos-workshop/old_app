pragma solidity ^0.5;

contract C3 {
<<<<<<< HEAD
    address public seller;
    uint public value;


    constructor(uint _value) public {
      seller = msg.sender;
=======
    // uint public seller;
    uint public value;


    constructor(uint _value) public{
      // seller = msg.sender;
>>>>>>> refs/remotes/origin/development
      value = _value;
    }


}
