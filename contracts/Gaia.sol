pragma solidity ^0.5;


//Import Contracts
import "./Endorsement.sol";
import "./C3.sol";
import "./C3PO.sol";


contract Gaia {
    // function() external payable {}
    address public carbos;
    address public endorsement;

    mapping(address => address) pending_c3_to_users;


    constructor() public {
      carbos = msg.sender;
      Endorsement e = new Endorsement(msg.sender);
      endorsement = address(e);
    }



       // function sendDeposit() public gaiaOnly { GAIA JUST TRANSFERS BALNCE TO HERE WITH CONSTRUCTION
        //only gaia can hold funds in escrow
        //define payee/submitter
        //get carbon value from c3, take 5%
        // int carbon = 20854612619117486000; //TEMP HARDCODE
        // carbon = carbon/20;
        // //get carbon -> eth price from oracle (price per ton in eth)
        // int ppt = 500000000000000000; //(.5 ether in Wei)vTEMP HARDCODE
    //}
}
