// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "./BikeOnChain.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract FactoryOfBikes {
  // Use the Counter contract to  track the number of contracts 
  using Counters for Counters.Counter;
// Store the addresses of the BikeOnChain contracts 

event CreatedCollection(string _brandName, string _brandCollection);
 
  BikeOnChain[] public bikeOnChainInstances;
  
  struct Brand {
    string brandName;
    string brandCollection;
  }

  Brand[] public brands;
  event BikeContractCreated(address bikeOnChain);
  Counters.Counter private contractIds;

  function createBikeOnChain(string memory _brandName, string memory _brandCollection) external {
    require(keccak256(abi.encode(_brandName, _brandCollection)) != keccak256(abi.encode("")), 'Empty field');
    // Create a new instance of the BikeOnChain contract
    BikeOnChain bikeOnChain = new BikeOnChain();
    bikeOnChain.transferOwnership(msg.sender);
    bikeOnChainInstances.push(bikeOnChain);
    contractIds.increment();
    brands.push(Brand(_brandName, _brandCollection));

    emit BikeContractCreated(address(bikeOnChain));
  }

  function getBikeContracts() external view returns (BikeOnChain[] memory) {
    return bikeOnChainInstances;
  }
}






