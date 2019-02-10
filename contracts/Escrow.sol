pragma solidity ^0.5;

contract Escrow {
    enum State{
        AWAITING_ENDORSEMENT,
        COMPLETE,
        CANCELED,
        FORFEIT
    }
    State public currentState;

    modifier requireState(State expectedState){
        require(currentState == expectedState);
        _;
    }

    modifier carbosOnly(){
        require(msg.sender == carbos);
        _;
    }

    modifier endorserOnly(){
        require(msg.sender == endorser || msg.sender == carbos);
        _;
    }

    address public endorser;
    address payable public carbos;
    address payable public deployer;
    uint public expiredDate;
    uint public forfeitDate;

    constructor(address payable _deployer, address _endorser, address payable _carbos) payable public {
        //receives the proper 5% balance on creation from gaia
        if (msg.value > 0) {
          currentState = State.AWAITING_ENDORSEMENT;
        }
        //assign addresses and timestamps
        endorser = _endorser;
        carbos = _carbos;
        deployer = _deployer;
        expiredDate = now + (30 * 1 days);
        forfeitDate = now + (60 * 1 days);
    }

    function endorsementComplete() public endorserOnly requireState(State.AWAITING_ENDORSEMENT){
        //action must be completed within 30 days of contract creation
        require(now <= expiredDate, "Contract Endorsement Window has ended. Funds may be recoverable by Carbos.");
        deployer.transfer(address(this).balance);
        currentState = State.COMPLETE;
    }

    function cancel() public carbosOnly {
        //if needed, can return balance and cancel the escrow
        deployer.transfer(address(this).balance);
        currentState = State.CANCELED;
    }

    function forfeit() public carbosOnly requireState(State.AWAITING_ENDORSEMENT){
        //after 60 days, can only transfer funds to _carbos
        require(now >= forfeitDate, "Contract is still active.");
        carbos.transfer(address(this).balance);
        currentState = State.FORFEIT;
    }
}
