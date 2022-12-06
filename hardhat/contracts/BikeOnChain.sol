// SPDX-License-Identifier: MIT
<<<<<<< HEAD

=======
>>>>>>> dd0fe45 (Modif du nom des compostants, ajout contrat solidity dans hardhat  (#1))
pragma solidity 0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract BikeOnChain is ERC721URIStorage {
    using Counters for Counters.Counter;
<<<<<<< HEAD

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
=======
    Counters.Counter private _tokenIds;

    struct Informations {
        uint256 _serialNumber;
        string _description;
        string _brand;
    }

    struct CarnetEntretien {
        string _commentaire;
        string _enseigne;
    }

    Informations[] arrOfInfo;
    CarnetEntretien[] carnet;

    mapping(uint256 => Informations) public data;
    mapping(uint256 => CarnetEntretien) public entretien;
    mapping(uint256 => string) public state;

    event BikeRegistered(uint256 BikelId);
    event EntretienEffectue(uint256 EntretienId);
    event StatusChange(string MessageProprietaire);

    constructor() ERC721("BikeOnChain", "BOC") {}

    function getInfos(uint256 _tokenId)
        public
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        // Retrieve the data from the mapping
        Informations memory d = data[_tokenId];
        return (d._brand, d._description, d._serialNumber);
    }

    function MintBike(
        address _player,
        string memory _tokenURI,
        uint256 _serialNumber,
        string calldata _description,
        string calldata _brand,
        uint256
    ) public returns (uint256) {
        _tokenIds.increment();
        //	bonhommes.push(Bonhommes(_height, _hat));
        uint256 newItemId = _tokenIds.current();
        data[newItemId] = Informations(_serialNumber, _description, _brand);

        _mint(_player, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    // informations that need to be set at the mint
    function addInformations(string calldata _desc) external {
        require(arrOfInfo.length < 10000, "Maximum proposals");
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Informations memory infromations;
        infromations._description = _desc;
        arrOfInfo.push(infromations);
        emit BikeRegistered(arrOfInfo.length - 1);
    }

    /// State can be set whit this function , we have to decide how to structure the state
    function updateState(uint256 _tokenId, string memory _newState) public {
        // Only the owner of the NFT can update its state
        require(_ownerOf(_tokenId) == msg.sender);
        // Update the state of the NFT.
        state[_tokenId] = _newState;
        //mesage of owner emmit when state change
        emit StatusChange(_newState);
    }

    function setEntretien(
        uint256 _tokenId,
        string memory _enseigne,
        string memory _commentaire
    ) public {
        // Only the owner of the NFT can update its state.
        require(_ownerOf(_tokenId) == msg.sender);
        // Update the state of the NFT.
        entretien[_tokenId] = CarnetEntretien(_enseigne, _commentaire);
        emit EntretienEffectue(carnet.length - 1);
    }
}
>>>>>>> dd0fe45 (Modif du nom des compostants, ajout contrat solidity dans hardhat  (#1))
