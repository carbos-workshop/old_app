pragma solidity ^0.5;


//Import Contracts
import "./Endorsement.sol";
import "./C3.sol";
import "./C3PO.sol";


contract Gaia {
    // function() external payable {}
    address public carbos;
    address public endorsement;
    address[] public allC3s;


    struct User {
      string name;
      address[] c3s;  //store the user's c3 addresses
    }

    //stores all the users
    mapping(address => User) public users;

    //stores all the c3s addresses to their corrispoding User
    mapping(address => address) public pending_c3;
    mapping(address => address) endorsed_c3;



    constructor() public {
      carbos = msg.sender;
      Endorsement e = new Endorsement(address(this));
      endorsement = address(e);

    }


    modifier onlyCarbos {
      require(msg.sender == carbos);
      _;
    }

    //add a new User
    function addUser(string memory _name, address _user_address, address[] memory init) onlyCarbos public {
        users[_user_address].name = _name;
        users[_user_address].c3s = init;
    }

    //this is gonna have a TON on @params
    function addPendingC3(address _user_address, uint value) public {

        //create and add C3 contract to the mappings
        C3 new_c3 = new C3(value);
        allC3s.push(address(new_c3));
        pending_c3[address(new_c3)] = _user_address;
        users[_user_address].c3s.push(address(new_c3));

        //create and connect an Escrow contract to the mappings
        //Also will have to check if the value is enough for gas price.
        //Escrow newEscrow = (new Escrow).value()(_user_address, endorser, carbos);

        //endorser.addContract("C3 Contract", address(new_c3), address(newEscrow));
    }

    function findAllUserC3(address _user_address) public view returns(address[] memory){
        return users[_user_address].c3s;
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
