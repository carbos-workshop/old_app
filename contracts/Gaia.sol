pragma solidity ^0.5;

//Import Contracts
import "./Endorsement.sol";
import "./C3.sol";
import "./Escrow.sol";
import "./C3PO.sol";


contract Gaia {
    // function() external payable {}
    address payable public  carbos;
    Endorsement public endorser;
    address public endorsement;
    C3PO public c3po;

    //this doesn't scale well and we should refactor to store pending and verified things seperately
    address[] public allC3s; //might want to move it only storing endorsed C3s

    event Generated(
      address contractAddress,
      address escrowAddress
    );

    //stores all the users and their c3s
    mapping(address => address[]) public users;

    //stores all the c3s addresses to their corrispoding User
    mapping(address => address) public c3s;

    //map geometries to their C3s
    mapping(string => address) geometries;

    constructor() public {
      carbos = msg.sender;
      endorser = new Endorsement(msg.sender);
      c3po = new C3PO();
      endorsement = address(endorser);
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
      int _latitude,
      int _longitude,
      uint _raId,
      uint _ppt,
      string memory _description,
      string memory _geometryHash
    ) public payable {

        //check that _ppt is NOT LOWER THAN C3PO
        if(_ppt < c3po.ETHPPT()){
            _ppt = c3po.ETHPPT();
          }
        //require msg.value > deposit
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
          _geometryHash,
          msg.sender,
          endorsement
        );



        //TODO reject c3s that have a identical geometryHash



        //map c3 to lookups
        geometries[newC3.geometryHash()] = address(newC3);
        c3s[address(newC3)] = msg.sender;
        users[msg.sender].push(address(newC3));
        allC3s.push(address(newC3));

        //create escrow and transfer value
        Escrow newEscrow = (new Escrow).value(msg.value)(msg.sender, address(endorser), carbos);
        endorser.addContract("Carbon Conservation Contract", address(newC3), address(newEscrow));

        emit Generated(address(newC3), address(newEscrow));
    }

    function getUsersC3(address userAddress) public view returns(address[] memory) {
        return users[userAddress];
    }
}
