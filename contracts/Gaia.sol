pragma solidity ^0.5;


//Import Contracts
import "./Endorsement.sol";
import "./C3.sol";
import "./Escrow.sol";
import "./C3PO.sol";


//Check Geometry hash is not in the C3 mapping

contract Gaia {
    // function() external payable {}
    address payable public  carbos;
    Endorsement public endorser;
    address public endorsement;
    C3PO public c3po;
    address[] public allC3s; //might want to move it only storing endorsed C3s

    event Generated(
      address contractAddress,
      address escrowAddress
    );

    struct User {
      string name;
      address[] c3s;  //store the user's c3 addresses
    }

    //stores all the users
    mapping(address => User) public users;

    //stores all the c3s addresses to their corrispoding User
    mapping(address => address) public c3s;




    constructor() public {
      carbos = msg.sender;
      endorser = new Endorsement(msg.sender);
      c3po = new C3PO();
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
    * @function: adds a newly created C3 to a c3s mapping until it is endorsed.
    * @param userAddress: payable? address of the contract owner
    * @param: TODO add remaining c3 params
    */
    function genC3(
      uint _totalCarbon,
      uint _aboveGroundCarbon,
      uint _belowGroundCarbon,
      uint _hectares,
      uint _latitude,
      uint _longitude,
      uint _raId,
      uint _ppt,
      string memory _description,
      // string memory _ownerDID,
      string memory _geometryHash
    ) public payable {


        //get ppt from C3P0, check that _ppt is NOT LOWER
        if(_ppt < c3po.ETHPPT()){
            _ppt = c3po.ETHPPT();
          }
        //require msg.value > deposit
        //convert _totalCarbon to ether value (resrote point), then multiply by ppt
        require(msg.value >= ((_ppt * (_totalCarbon/10**18))/20), "Message did not contain a large enough deposit.  Expected 5% of total value.");
        //create and add C3 contract to the mappings
        C3 newC3 = new C3(
          _totalCarbon,
          _aboveGroundCarbon,
          _belowGroundCarbon,
          _hectares,
          _latitude,
          _longitude,
          _ppt,
          _raId,
          _description,
          // _ownerDID,
          _geometryHash,
          msg.sender,
          endorsement
          // carbos
        );
        //TODO reject c3s that have a identical geometryHash
        c3s[address(newC3)] = msg.sender;
        users[msg.sender].c3s.push(address(newC3));
        allC3s.push(address(newC3));

        //create escrow and transfer value
        Escrow newEscrow = (new Escrow).value(msg.value)(msg.sender, address(endorser), carbos);

        endorser.addContract("Carbon Conservation Contract", address(newC3), address(newEscrow));
        emit Generated(address(newC3), address(newEscrow));
    }


    /*
    * @function: returns all of the C3s that a user owns or partially owns
    * @param userAddress: address of the user in question
    * @return: returns all of the c3 addresses that the user in owner of
    */
    function findAllUserC3(address userAddress) public view returns(address[] memory){
        return users[userAddress].c3s;
    }

}
