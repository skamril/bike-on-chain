// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Base64.sol";

/// @title A collection contract (ERC721) for bikes.
/// @author Samir Kamal
/// @author Rusmir Sadikovic 
/// @dev Use Ownable contract from OpenZeppelin
/// @notice Allow to create a collection of bikes.
///         To mint multiple bike at once.
contract BikeCollection is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter; 

    ////////////////////////////////////////////////////////////////
    // Enums
    ////////////////////////////////////////////////////////////////

    enum Status {
        Idle,
        OnSale,
        InService,
        OutOfService,
        Stealed
    }

    ////////////////////////////////////////////////////////////////
    // Structs
    ////////////////////////////////////////////////////////////////

    struct Bike {
        uint256 id;
        string name;
        string model;
        string description;
        string image;
        uint16 buildYear;
        uint256 firstPurchaseDate;
        string serialNumber;
        Status status;
    }

    ////////////////////////////////////////////////////////////////
    // Events
    ////////////////////////////////////////////////////////////////

    event GroupCreated(uint256 id, uint16 amount, Bike template); 

    event GroupUpdated(uint256 id, uint amount); 

    ////////////////////////////////////////////////////////////////
    // Modifiers
    ////////////////////////////////////////////////////////////////

    modifier ifTokenExist(uint256 id) {
        require(_exists(id), "Bike doesn't exist");
        _;
    }

    modifier ifTokenApprovedOrOwner(uint256 id) {
        require(_isApprovedOrOwner(_msgSender(), id), "Caller is not bike owner or approved");
        _;
    }

    modifier ifValidStatus(uint tokenId) {
        require(_bikeByTokenId[tokenId].status != Status.Idle && _bikeByTokenId[tokenId].status != Status.OnSale, "Not allowed");
        _;
    }

    ////////////////////////////////////////////////////////////////
    // Storage
    ////////////////////////////////////////////////////////////////
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _groupIds;
    mapping(uint256 => Bike) private _bikeByTokenId;
    mapping(uint256 => uint256[]) private _tokenIdsByGroupId;

    ////////////////////////////////////////////////////////////////
    // Constructor
    ////////////////////////////////////////////////////////////////

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    ////////////////////////////////////////////////////////////////
    // Mint
    ////////////////////////////////////////////////////////////////

    function batchMint(
        uint16 amount,
        string calldata name, 
        string calldata model,  
        string calldata description,  
        string calldata image,
        uint16 buildYear
    )  external onlyOwner {
        _groupIds.increment();
        uint256 currentGroupId = _groupIds.current();

        for (uint i = 0; i < amount; i++) {
            uint256 tokenId = _mintBike(name, model, description, image, buildYear);
            _tokenIdsByGroupId[currentGroupId].push(tokenId);
        } 

        emit GroupCreated(
            currentGroupId, 
            amount, 
            Bike(0, name, model, description, image, buildYear, 0, "", Status.Idle)
        );
    }

    function _mintBike(
        string calldata name, 
        string calldata model,  
        string calldata description,  
        string calldata image,
        uint16 buildYear
    ) private onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(msg.sender, currentTokenId);
        _bikeByTokenId[currentTokenId] = Bike(currentTokenId, name, model, description, image, buildYear, 0, "", Status.Idle);

        return currentTokenId;
    }

    ////////////////////////////////////////////////////////////////
    // Transfer
    ////////////////////////////////////////////////////////////////

    function batchTransferForSale(
        address from,
        address to,
        uint256 groupId,
        uint16 amount
    ) external onlyOwner {
        require (amount <= _tokenIdsByGroupId[groupId].length, "Amount too higher");

        for (uint i = 0; i < amount; i++) {
            uint256 tokenId = _tokenIdsByGroupId[groupId][_tokenIdsByGroupId[groupId].length - 1];
            _tokenIdsByGroupId[groupId].pop();
            _bikeByTokenId[tokenId].status = Status.OnSale;
            safeTransferFrom(from, to, tokenId, "");
        }

        emit GroupUpdated(groupId, _tokenIdsByGroupId[groupId].length);
    }

    function transferForService(address from, address to, uint256 tokenId, string calldata serialNumber, uint256 firstPurchaseDate) external ifTokenExist(tokenId) ifTokenApprovedOrOwner(tokenId) {
        require(_bikeByTokenId[tokenId].status == Status.OnSale, "Not on sale");
        require(keccak256(abi.encode(serialNumber)) != keccak256(abi.encode("")), "SN empty");

        _bikeByTokenId[tokenId].firstPurchaseDate = firstPurchaseDate;
        _bikeByTokenId[tokenId].serialNumber = serialNumber;
        _bikeByTokenId[tokenId].status = Status.InService;

        safeTransferFrom(from, to, tokenId, "");
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(_bikeByTokenId[tokenId].status != Status.Idle, "Idle mode");
        require(_bikeByTokenId[tokenId].status == Status.InService ? keccak256(abi.encode(_bikeByTokenId[tokenId].serialNumber)) != keccak256(abi.encode("")) : true, "Call transferForService");
       
        super._transfer(from, to, tokenId);
    }

    ////////////////////////////////////////////////////////////////
    // Status
    ////////////////////////////////////////////////////////////////
    
    function setStealed(uint256 tokenId) external ifTokenExist(tokenId) ifTokenApprovedOrOwner(tokenId) ifValidStatus(tokenId) {
        _bikeByTokenId[tokenId].status = Status.Stealed;
    }

    function setInService(uint256 tokenId) external ifTokenExist(tokenId) ifTokenApprovedOrOwner(tokenId) ifValidStatus(tokenId) {
        _bikeByTokenId[tokenId].status = Status.InService;
    }

    function setOutOfService(uint256 tokenId) external ifTokenExist(tokenId) ifTokenApprovedOrOwner(tokenId) ifValidStatus(tokenId) {
        _bikeByTokenId[tokenId].status = Status.OutOfService;
    }

    function _statusToString(Status status) private pure returns (string memory) {
        if (status == Status.Idle) {
            return "Idle";
        } 
        if (status == Status.OnSale) {
            return "On sale";
        }
        if (status == Status.InService) {
            return "In service";
        }
        if (status == Status.OutOfService) {
            return "Out of service";
        }
        if (status == Status.Stealed) {
            return "Stealed";
        }
        return "/";
    }

    ////////////////////////////////////////////////////////////////
    // Getters
    ////////////////////////////////////////////////////////////////

    function getBike(uint256 tokenId) external view ifTokenExist(tokenId) returns (Bike memory) {
        return _bikeByTokenId[tokenId];
    }

    function getGroupAmount(uint256 groupId) external view returns (uint256) {
        return _tokenIdsByGroupId[groupId].length;
    }

    function getGroupsAmount() external view returns (uint256) {
        return _groupIds.current();
    }

    ////////////////////////////////////////////////////////////////
    // URI
    ////////////////////////////////////////////////////////////////

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        Bike memory bike = _bikeByTokenId[tokenId];

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "', bike.name, ' #', Strings.toString(tokenId), '",',
                '"description": "', bike.description, '",',
                '"image": "', bike.image, '",',
                '"status": ', Strings.toString(uint8(bike.status)), ',',
                '"external_link": "http://bike-on-chain.vercel.app/', Strings.toHexString(uint256(uint160(address(this))), 20), '/', Strings.toString(tokenId), '",',
                '"attributes": [',
                    '{',
                        '"trait_type": "Build year",', 
                        '"value": "', Strings.toString(bike.buildYear), '"',
                    '},',
                    '{',
                        '"trait_type": "First purchase date",', 
                        '"display_type": "date",',
                        '"value": ', Strings.toString(bike.firstPurchaseDate),
                    '},',
                    '{',
                        '"trait_type": "Serial number",', 
                        '"value": "', bike.serialNumber, '"',
                    '},',
                    '{',
                        '"status": "Status",', 
                        '"value": "', _statusToString(bike.status), '"',
                    '}',
                ']',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }
}