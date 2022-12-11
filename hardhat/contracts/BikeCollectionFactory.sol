// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "./BikeCollection.sol";

contract BikeCollectionFactory{

    ////////////////////////////////////////////////////////////////
    // Events
    ////////////////////////////////////////////////////////////////

    event CollectionCreated(address collectionAddr, address ownerAddr, string name, string symbol);

    ////////////////////////////////////////////////////////////////
    // Storage
    ////////////////////////////////////////////////////////////////

    mapping(address => BikeCollection) private _collectionByOwner;
    address[] private _collectionAddrs;

    ////////////////////////////////////////////////////////////////
    // Create
    ////////////////////////////////////////////////////////////////

    function createCollection(string memory name, string memory symbol, address owner) public {
        require(address(_collectionByOwner[owner]) == address(0), "Already has a collection");

        BikeCollection collection = new BikeCollection(name, symbol);
        collection.transferOwnership(owner);

        _collectionAddrs.push(address(collection));
        _collectionByOwner[owner] = collection;

        emit CollectionCreated(address(collection), owner, name, symbol);
    }
}


