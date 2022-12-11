// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/Base64.sol";

contract BocBikes is ERC721URIStorage, Ownable {
    using Strings for uint256;
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

    struct ServiceBookEntry {
        string title;
        string description;
        uint date;
    }

    struct Bike {
        uint256 id;
        string name;
        string description;
        string image;
        uint16 buildYear;
        uint256 firstPurchaseDate;
        string serialNumber;
        Status status;
    }

    struct GroupInfo {
        uint256 id;
        Bike template;
    }

    ////////////////////////////////////////////////////////////////
    // Events
    ////////////////////////////////////////////////////////////////

    event GroupCreated(GroupInfo info); 

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

    ////////////////////////////////////////////////////////////////
    // Storage
    ////////////////////////////////////////////////////////////////
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _groupIds;
    mapping(uint256 => Bike) private _bikeByTokenId;
    mapping(uint256 => ServiceBookEntry[]) private _serviceBookByTokenId;
    mapping(uint256 => GroupInfo) private _groupInfoByGroupId;
    mapping(uint256 => uint256[]) private _tokenIdsByGroupId;

    ////////////////////////////////////////////////////////////////
    // Constructor
    ////////////////////////////////////////////////////////////////

    constructor() ERC721 ("Bike On Chain", "BOC"){}

    ////////////////////////////////////////////////////////////////
    // Mint
    ////////////////////////////////////////////////////////////////

    function batchMint(
        uint16 amount,
        string calldata name, 
        string calldata description,  
        string calldata image,
        uint16 buildYear
    )  external onlyOwner {
        _groupIds.increment();
        uint256 currentGroupId = _groupIds.current();

        for (uint i = 0; i < amount; i++) {
            uint256 tokenId = _mint(name, description, image, buildYear);
            _tokenIdsByGroupId[currentGroupId].push(tokenId);
        } 

        GroupInfo memory info = GroupInfo(
            currentGroupId,
            Bike(0, name, description, image, buildYear, 0, "", Status.Idle)
        );

        _groupInfoByGroupId[currentGroupId] = info;

        emit GroupCreated(info);
    }

    function _mint(
        string calldata name, 
        string calldata description,  
        string calldata image,
        uint16 buildYear
    ) private onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();

        _safeMint(msg.sender, currentTokenId);

        _bikeByTokenId[currentTokenId] = Bike(currentTokenId, name, description, image, buildYear, 0, "", Status.Idle);

        _setTokenURI(currentTokenId, _getTokenURI(currentTokenId));

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
    }

    function transferForService(address from, address to, uint256 tokenId, string calldata serialNumber) external ifTokenExist(tokenId) ifTokenApprovedOrOwner(tokenId) {
        require(_bikeByTokenId[tokenId].status == Status.OnSale, "Bike must be on sale");
        require(!_isStringEmpty(serialNumber), "Serial number cannot be empty");

        _bikeByTokenId[tokenId].firstPurchaseDate = block.timestamp;
        _bikeByTokenId[tokenId].serialNumber = serialNumber;
        _bikeByTokenId[tokenId].status = Status.InService;

        safeTransferFrom(from, to, tokenId, "");
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(_bikeByTokenId[tokenId].status != Status.Idle, "Bike cannot be transferred in idle mode");
        require(_bikeByTokenId[tokenId].status == Status.OnSale ? !_isStringEmpty(_bikeByTokenId[tokenId].serialNumber) : true, "Call transferForService instead");
        super._transfer(from, to, tokenId);
    }

    ////////////////////////////////////////////////////////////////
    // Status
    ////////////////////////////////////////////////////////////////
    

    ////////////////////////////////////////////////////////////////
    // Utils
    ////////////////////////////////////////////////////////////////

    function _isStringEmpty(string memory value) private pure returns (bool) {
        return keccak256(abi.encode(value)) != keccak256(abi.encode(""));
    }

    ////////////////////////////////////////////////////////////////
    // Getters
    ////////////////////////////////////////////////////////////////

    function getBike(uint256 tokenId) external view ifTokenExist(tokenId) returns (Bike memory) {
        return _bikeByTokenId[tokenId];
    }

    function getGroupInfo(uint256 groupId) external view returns (GroupInfo memory) {
        return _groupInfoByGroupId[groupId];
    }

    function getGroupAmount(uint256 groupId) external view returns (uint256) {
        return _tokenIdsByGroupId[groupId].length;
    }

    function getGroupsAmount() external view returns (uint256) {
        return _groupIds.current();
    }

    function _getTokenURI(uint256 tokenId) private view ifTokenExist(tokenId) returns (string memory) {
        Bike memory bike = _bikeByTokenId[tokenId];

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "', bike.name, ' #', tokenId.toString(), '",',
                '"description": "', bike.description, '",',
                '"image": "', bike.image, '",',
                '"external_link": "http://bike-on-chain.vercel.app/', address(this), '/', tokenId.toString(), '"',
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
