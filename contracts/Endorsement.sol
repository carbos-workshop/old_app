pragma solidity 0.4.25;

contract Endorsement {
    address public owner;
    string public name;

    event Vote(string ccc_name, uint vote_count);

    //Might need to make this the address of the actual C3 contract
    struct ccc{
      string  ccc_name;
      address ccc_address;
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
    ccc[] public cccs;
    mapping(address => Voter) public voters;

    constructor(string _name) public {
      owner = msg.sender;
      name  = _name;
    }

    function addCCC(string _name, address _ccc_address) public {
      cccs.push(ccc(_name, _ccc_address, 0));
    }

    function authorize(address _voter) public ownerOnly{
        voters[_voter].authorized = true;
    }


    //TODO: Need to make sure that the voter has not already voted for a c3
    function vote(uint cccID) public isAuthorized{
      require(cccID < cccs.length, "Not a valid c3 index");
      require(voters[msg.sender].voted[cccs[cccID].ccc_address] != 1, "Voter has already voted for this C3");


      voters[msg.sender].voted[cccs[cccID].ccc_address] = 1;
      cccs[cccID].vote_count += 1;

      emit Vote(cccs[cccID].ccc_name, cccs[cccID].vote_count);

    }
}
