pragma solidity ^0.5;

contract Endorsement {
    address public owner;

    event Vote(string c3_name, uint vote_count);

    //Might need to make this the address of the actual C3 contract
    struct c3{
      string  c3_name;
      address c3_address;
      uint    vote_count;
    }

    struct Voter{
      bool authorized;
      mapping(address => uint) voted; //attempt to stop people from voting on the same c3
    }

    //This will probably be GAIA
    modifier ownerOnly(){
      require(msg.sender == owner);
      _;
    }

    modifier isAuthorized() {
      require(voters[msg.sender].authorized == true || msg.sender == owner, "Not authorized to vote");
      _;
    }


    uint public total_votes;
    c3[] public c3_array;
    mapping(address => Voter) public voters;

    constructor() public {
      owner = msg.sender;
    }

    function addc3(string memory _name, address _c3_address) public {
      c3_array.push(c3(_name, _c3_address, 0));
    }

    function authorize(address _voter) public ownerOnly{
        voters[_voter].authorized = true;
    }


    //TODO: Need to make sure that the voter has not already voted for a c3
    function vote(uint c3ID) public isAuthorized{
      require(c3ID < c3_array.length, "Not a valid c3 index");
      require(voters[msg.sender].voted[c3_array[c3ID].c3_address] != 1, "Voter has already voted for this C3");


      voters[msg.sender].voted[c3_array[c3ID].c3_address] = 1;
      c3_array[c3ID].vote_count += 1;

      emit Vote(c3_array[c3ID].c3_name, c3_array[c3ID].vote_count);

    }

    //TODO: update c3 contracts to endorsed.
    //TODO: call Escrow contract to release downpayment.

}
