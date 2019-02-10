pragma solidity ^0.5;

contract C3 {
    enum State{
      AWAITING_ENDORSEMENT,
      VERIFIED,
      INVALID
    }
    State public currentState;

    modifier requireState(State expectedState){
        require(currentState == expectedState);
        _;
    }

    modifier endorserOnly(){
        require(msg.sender == endorser);
        _;
    }

    modifier carbosOnly(){
        require(msg.sender == carbos);
        _;
    }


    uint public totalCarbon;
    uint public buyableCarbon;
    uint public aboveGroundCarbon;
    uint public belowGroundCarbon;
    uint public hectares;
    uint public latitude;
    uint public longitude;
    uint public raId;
    uint public ppt;
    string public description;
    string public ownerDID;
    string public geometryHash;
    address payable public ownerAddress;
    address public endorser;
    address public carbos;
    mapping(address => uint) public buyers;
    address[] public allBuyers;  //may be reduntant storage with transactional history providing addresses

    //set all params to global variables, and set buyableCarbon to _totalCarbon
    constructor(
      uint _totalCarbon,
      uint _aboveGroundCarbon,
      uint _belowGroundCarbon,
      uint _hectares,
      uint _latitude,
      uint _longitude,
      uint _ppt;
      uint _raId,
      string _description,
      string _ownerDID,
      string _geometryHash,
      address payable _ownerAddress,
      address _endorser,
      address _carbos
    ) public{
      totalCarbon = _totalCarbon;
      aboveGroundCarbon = _aboveGroundCarbon;
      belowGroundCarbon = _belowGroundCarbon;
      buyableCarbon = _totalCarbon; //set total buyable to total carbon
      hectares = _hectares;
      latitude = _latitude;
      longitude = _longitude;
      ppt = _ppt;
      raId = _raId;
      description = _description;
      ownerDID = ownerDID;
      geometryHash = _geometryHash;
      ownerAddress = _ownerAddress;
      endorsement = _endorser;
      carbos = _carbos;
      currentState = State.AWAITING_ENDORSEMENT;
    }

    function receiveEndorsement() public endorserOnly requireState(State.AWAITING_ENDORSEMENT) {
      currentState = State.VERIFIED;
    }

    function invalidate() public carbosOnly {
      currentState = State.INVALID;
    }

    function buyCarbon(uint _tons) public payable requireState(State.VERIFIED){
      //require tons to be positive and if too large = buyableCarbon
      require(_tons > 0), "Tons must be a positive value";
      //if _tons is too high, buy all carbon remaining
      if (_tons > buyableCarbon) {
        _tons = buyableCarbon;
      }
      //calculate required msg.value from ppt + _tons
      require(msg.value >= (ppt * _tons), "Insufficient value sent to complete transaction.");
      //transfer msg.value to owner
      ownerAddress.transfer(msg.value);
      //subtract _tons from buyableCarbon
      buyableCarbon = buyableCarbon - _tons;
      //add buyer to buyers map with _tons (for address-based lookup of tonnage)
      buyers[msg.sender].tonnage = _tons;
      //add buyer to allBuyers array for address lookups
      allBuyers.push(msg.sender);
    }
}
