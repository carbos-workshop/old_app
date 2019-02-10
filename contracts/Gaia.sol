pragma solidity ^0.5;


//Import Contracts
import "./Endorsement.sol";
import "./C3.sol";
import "./C3PO.sol";


//Check Geometry hash is not in the C3 mapping

contract Gaia {
    // function() external payable {}
    address payable public  carbos;
    Endorsement public endorser;
    address public endorsement;
    address[] public allC3s; //might want to move it only storing endorsed C3s


    struct User {
      string name;
      address[] c3s;  //store the user's c3 addresses
    }

    //stores all the users
    mapping(address => User) public users;

    //stores all the c3s addresses to their corrispoding User
    mapping(address => address) public pending_c3;

    //may want this later, right now it is just stored in the allC3s
    mapping(address => address) public endorsed_c3;



    constructor() public {
      carbos = msg.sender;
      endorser = new Endorsement(msg.sender);
      endorsement = address(endorser);
    }


    modifier onlyCarbos {
      require(msg.sender == carbos);
      _;
    }

    /*
    * @function: adds a new User to the mapping
    * @param _name: name of the user
    * @param _user_address: address of the users
    * @param c3s: init empty array of address for future c3 contracts
    */
    function addUser(string memory _name, address _user_address, address[] memory init) onlyCarbos public {
        users[_user_address].name = _name;
        users[_user_address].c3s = init;
    }

    /*
    * @function: adds a newly created C3 to a pending_c3 mapping until it is endorsed.
    * @param userAddress: payable? address of the contract owner
    * @param: TODO add remaining c3 params
    */
    function genC3(address payable _user_address, uint value) public payable returns(address){

        //create and add C3 contract to the mappings
        C3 new_c3 = new C3(value);
        pending_c3[address(new_c3)] = _user_address;
        //users[_user_address].c3s.push(address(new_c3));

        uint deposit = value / 20;
        //create and connect an Escrow contract to the mappings
        //Also will have to check if the value is enough for gas price.
        Escrow newEscrow = (new Escrow).value(deposit * 1 ether)(_user_address, endorsement, carbos);

        endorser.addContract("C3 Contract", address(new_c3), address(newEscrow));
    }

    /*
    * @function: returns all of the C3s that a user owns or partially owns
    * @param userAddress: address of the user in question
    * @return: returns all of the c3 addresses that the user in owner of
    */
    function findAllUserC3(address userAddress) public view returns(address[] memory){
        return users[userAddress].c3s;
    }


    /*
      @function adds an endorsed contract to the mapping, deletes from the pending_c3
    * and adds to the allC3 array.
    * @param c3Contract: address of the C3 contract
    * @param userAddress: address of the user that created the C3
    */
    function nowEndorsed(address c3Contract, address userAddress) public {
      require(msg.sender == address(endorser));
      endorsed_c3[c3Contract] = userAddress;
      allC3s.push(c3Contract);
      delete pending_c3[c3Contract];
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
