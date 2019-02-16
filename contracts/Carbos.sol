pragma solidity ^0.5;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import './Gaia.sol';


contract Carbos is ERC721Full {

  //TODO: add carbosAddress and gaia

  struct carbos {
    uint receptNum;
    address parentContract;
    uint carbonValue;
  }

  carbos[] public activeCarbos;

  constructor(string memory name, string memory symbol)
  ERC721Full(name, symbol)
  public {}


  //TODO: require that the sender is a C3 address, maybe impleneted a visual URI for the carbosToken
  function createCarbos(address _to, uint carbonValue) public returns (bool) {

      //require(msg.sender.State() === 1)

      uint256 carbosId = activeCarbos.length;
      carbos memory newCarbos = carbos(carbosId, msg.sender, carbonValue);
      activeCarbos.push(newCarbos);
      _mint(_to, carbosId);
      return true;
  }

}
