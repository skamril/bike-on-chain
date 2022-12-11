// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "./BikeOnChain.sol";


/**
 * @title BrandRegistry
 * @dev This contract is used to create and manage instances of the BikeOnChain contract.
 */
contract FractoryOfBikes {
  // Store the addresses of the BikeOnChain contracts
  BikeOnChain[] public bikeOnChainInstances;

  // Mapping for brand collections to addresses public 
  mapping(string => address) public brandCollections;

  // Store brand names and collections in a mapping for BOC only 
  mapping(string => string) private brands;

  /**
   * @dev Emits one event when a new BikeOnChain contract is created.
   * @param bikeOnChain The address of created BikeOnChain contract.
   */
  event BikeContractCreated(address indexed bikeOnChain);

  /**
   * @dev Creates a new instance of the BikeOnChain contract.
   * @param _brandName Name of the brand associated with the new contract.
   * @param _brandCollection  ollection of the brand associated with the new contract.
   */
  function createBikeOnChain(string memory _brandName, string memory _brandCollection) external {
    require(keccak256(abi.encode(_brandName, _brandCollection)) != keccak256(abi.encode("")), 'Empty');
    // Create a new instance of the BikeOnChain contract
    BikeOnChain bikeOnChain = new BikeOnChain();
    bikeOnChainInstances.push(bikeOnChain);

    // Store the brand name and collection in the mapping
    brands[_brandName] = _brandCollection;
    // Add the brand collection to the mapping
    brandCollections[_brandCollection] = address(bikeOnChain);
    // Emit the event
    emit BikeContractCreated(address(bikeOnChain));
  }

  /**
   * @dev Returns the array of BikeOnChain contract addresses.
   * @return The array of BikeOnChain contract addresses.
   */
  function getBikeContracts() external view returns (BikeOnChain[] memory) {
    return bikeOnChainInstances;
  }
}