pragma solidity ^0.5;

import "./Escrow.sol";
//import "./C3.sol";

contract Endorsement {
    address public owner;

    event Vote(
      string contract_type,
      address contract_address,
      address escrow_address,
      uint vote_count
    );
    event Endorsed(
      string contract_type,
      address contract_address,
      address escrow_address,
      uint vote_count
    );

    //Might need to make this the address of the actual C3 contract
    struct Contract{
      string  contract_type;
      address contract_address;
      address escrow_address;
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
    Contract[] public contracts_array;
    mapping(address => Voter) public voters;

    constructor() public {
      owner = msg.sender;
    }

    function addContract(string memory _contract__type, address _contract_address, address _escrow_address) public {
      contracts_array.push(Contract(_contract__type, _contract_address, _escrow_address, 0));
    }

    function authorize(address _voter) public ownerOnly{
        voters[_voter].authorized = true;
    }

    function vote(uint contractID) public isAuthorized{
      require(contractID < contracts_array.length, "Not a valid c3 index");
      require(voters[msg.sender].voted[contracts_array[contractID].contract_address] != 1, "Voter has already voted for this C3");


      voters[msg.sender].voted[contracts_array[contractID].contract_address] = 1;
      contracts_array[contractID].vote_count += 1;

      emit Vote(
        contracts_array[contractID].contract_type,
        contracts_array[contractID].contract_address,
        contracts_array[contractID].escrow_address,
        contracts_array[contractID].vote_count
      );

      if(contracts_array[contractID].vote_count >= 5) {
        releaseDownpayment(contracts_array[contractID].escrow_address);

        emit Endorsed(
          contracts_array[contractID].contract_type,
          contracts_array[contractID].contract_address,
          contracts_array[contractID].escrow_address,
          contracts_array[contractID].vote_count
        );
      }

    }

    //TODO: update c3 contracts to endorsed.
    //TODO: call Escrow contract to release downpayment.
    function releaseDownpayment(address escrow_address) internal {
        Escrow to_pay = Escrow(escrow_address);
        to_pay.endorsementComplete();
    }

}
