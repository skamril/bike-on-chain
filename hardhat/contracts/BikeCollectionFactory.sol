// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./BikeCollection.sol";

/// @title A factory for bikes collection (ERC721)
/// @author Samir Kamal
/// @author Rusmir Sadikovic 
/// @dev Use Ownable contract from OpenZeppelin
/// @notice Allow to create a collection by user.
contract BikeCollectionFactory is Ownable {

    ////////////////////////////////////////////////////////////////
    // Events
    ////////////////////////////////////////////////////////////////

    /// @notice Event to indicate that a collection is created
    event CollectionCreated(address collectionAddr, address ownerAddr, string name, string symbol);

    ////////////////////////////////////////////////////////////////
    // Modifiers
    ////////////////////////////////////////////////////////////////

    /// @notice Check if the caller is the owner of the collection
    modifier ifCollectionOwner() {
        require(isCollectionOwner(), "Caller has no collection");
        _;
    }
   
    ////////////////////////////////////////////////////////////////
    // Storage
    ////////////////////////////////////////////////////////////////

    mapping(address => BikeCollection) private _collectionByOwner;
    address[] public collectionAddresses;

    ////////////////////////////////////////////////////////////////
    // Create
    ////////////////////////////////////////////////////////////////

    /// @notice Create a collection `BikeCollection`. One by user.
    function createCollection(string memory name, string memory symbol, address owner) external onlyOwner  {
        require(address(_collectionByOwner[owner]) == address(0), "Already has a collection");

        BikeCollection collection = new BikeCollection(name, symbol);
        collection.transferOwnership(owner);

        collectionAddresses.push(address(collection));
        _collectionByOwner[owner] = collection;

        emit CollectionCreated(address(collection), owner, name, symbol);
    }

    ////////////////////////////////////////////////////////////////
    // Utils
    ////////////////////////////////////////////////////////////////

    /// @notice Check if the caller is the owner of the collection
    function isCollectionOwner() public view returns (bool) {
        return address(_collectionByOwner[msg.sender]) != address(0);
    }

    /// @notice Get the collection associated with the user
    function getCollection() external view ifCollectionOwner() returns (BikeCollection) {
        return _collectionByOwner[msg.sender];
    }
}


