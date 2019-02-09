pragma solidity ^0.5;

import "./Escrow.sol";

contract Endorsement {
    address public gaia;
    address public carbos;
    uint internal requiredEndorsements;

    // emitied on successful vote
    event Vote(
      string classification,
      address addr,
      address escrow,
      uint count
    );

    //emitted on full endorsement
    event Endorsed(
      string classification,
      address addr,
      address escrow,
      uint count
    );

    event Authorized(
      address voter
    );

    //actual store for number of votes
    struct Contract{
      string  classification;//type
      address escrow; //affiliated escrow holding account
      uint    count; //numVotes
    }

    struct Voter{
      bool authorized;
      mapping(address => bool) voted; //can only vote one tile on address (true = has voted)
    }

    modifier carbosOnly(){
      require(msg.sender == carbos);
      _;
    }

    modifier gaiaOnly(){
      require(msg.sender == gaia);
      _;
    }

    modifier isAuthorized() {
      require(voters[msg.sender].authorized == true, "Not authorized to vote");
      _;
    }

    mapping(address => Contract) public contracts; //lookup for Contract's endorsement status
    mapping(address => Voter) public voters; //lookup for voters voting status on a contract

<<<<<<< HEAD
    constructor(address _gaia) public {
      gaia = _gaia;
      carbos = msg.sender;
=======
    constructor(address _carbos) public {
      carbos = _carbos;
      gaia = msg.sender;
>>>>>>> refs/remotes/origin/development
    }


    function returnVotersAuthorized(address _input) public returns(bool){
      return voters[_input].authorized;
    }


    //gaia needs to ensure that Contract and Escrow accounts are corrent otherwise this is abusable
    function addContract(string memory _classification, address _contract, address _escrow) public gaiaOnly {
      contracts[_contract] = Contract(_classification, _escrow, 0);
    }

    //carbos can add voters to authorized mapping of voters
    function authorize(address _voter) public carbosOnly{
        voters[_voter].authorized = true;
        emit Authorized(_voter);
    }

    //carbos can fully release and endoresement
    function fullyEndorse(address _contract) public carbosOnly{
        contracts[_contract].count = requiredEndorsements;
        checkForRelease(_contract);
    }

    function vote(address _contract) public isAuthorized{
      require(voters[msg.sender].voted[_contract] = false, "Voter has already voted for this C3");
      //voter has used their one vote
      voters[msg.sender].voted[_contract] = true;
      //increment endorsements on Contract struct
      contracts[_contract].count += 1;

      emit Vote(
        contracts[_contract].classification,
        _contract,
        contracts[_contract].escrow,
        contracts[_contract].count
      );
      //see if releaseDeposit can be called
      checkForRelease(_contract);
    }

    function checkForRelease(address _contract) internal {
      //release is count > requiredEndorsements
      if(contracts[_contract].count >= requiredEndorsements) {
        releaseDeposit(contracts[_contract].escrow);

        emit Endorsed(
          contracts[_contract].classification,
          _contract,
          contracts[_contract].escrow,
          contracts[_contract].count
        );
      }
    }

    function releaseDeposit(address escrow) internal {
        Escrow payee = Escrow(escrow);
        payee.endorsementComplete();

        //TODO: update c3 contracts to endorsed.
    }

}
