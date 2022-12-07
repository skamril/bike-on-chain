// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract BikeOnChain is ERC721URIStorage {
    using Counters for Counters.Counter;

    struct Bike {
        uint64 serialNumber;
        string model;
        string brand;
        bool stolen;
        bool onSale;
    }

    struct MaintenanceBook {
        string store;
        string commentar;
    }

    mapping(uint256 => Bike) public bikes;
    mapping(uint256 => MaintenanceBook) public maintenance;
    mapping(address => bool) authorizedMaintenance;

    Counters.Counter private tokenIds;

    event BikeRegistered(uint256 indexed bikeId);
    event MaintenanceDone(uint256 indexed bikeId);
    event StolenBike(uint256 indexed bikeId, bool stolen);
    event BikeOnSale(uint256 indexed bikeId, bool onSale);
    event AuthorizedMaintenance(address indexed _address);

    constructor() ERC721("BikeOnChain", "BOC") {}

    modifier checkWhitelist() {
        require(authorizedMaintenance[msg.sender], "You are not register as maintenance ");
        _;
    }

    function authorizeMaintenance(uint256 _tokenId, address _address) public {
        require(_ownerOf(_tokenId) == msg.sender, "Only the owner of the bike can authorize maintenance");
        authorizedMaintenance[_address] = true;
        emit AuthorizedMaintenance(_address);
    }

    function getInfos(uint256 _tokenId) public view returns (string memory, string memory, uint64) {
        Bike storage bike = bikes[_tokenId];
        return (bike.brand, bike.model, bike.serialNumber);
    }

    function mintBike(
        address _newOwner,
        string memory _tokenURI,
        string calldata _model,
        string calldata _brand,
        uint64 _serialNumber
    ) public returns (uint256) {
        tokenIds.increment();
        uint256 newBikeId = tokenIds.current();
        bikes[newBikeId] = Bike({
            serialNumber: _serialNumber,
            model: _model,
            brand: _brand,
            stolen: false,
            onSale: false
        });
        _mint(_newOwner, newBikeId);
        _setTokenURI(newBikeId, _tokenURI);
        emit BikeRegistered(newBikeId);
        return newBikeId;
    }

    function setMaintenance(uint256 _tokenId, string calldata _store, string calldata _commentar)
        external
        checkWhitelist
    {
        require(_ownerOf(_tokenId) == msg.sender, "Only the owner of the bike can set maintenance information");
        maintenance[_tokenId] = MaintenanceBook({
            store: _store,
            commentar: _commentar
        });
        emit MaintenanceDone(_tokenId);
    }

    function declareStolen(uint256 _tokenId, bool _stolen) public {
        require(_ownerOf(_tokenId) == msg.sender, "Only the owner of the bike can declare it stolen");
        Bike storage bike = bikes[_tokenId];
        bike.stolen = _stolen;
emit StolenBike(_tokenId,_stolen);
    }
       function setOnSale(uint256 _tokenId, bool _onSale) public {
           require(_ownerOf(_tokenId) == msg.sender, "Only the owner of the bike can sell this bike");
     require(bikes[_tokenId].stolen == false);
      Bike storage bike = bikes[_tokenId];
      bike.onSale = _onSale;
    emit BikeOnSale(_tokenId,_onSale);
    
       }
    }
