// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract BikeOnChain is ERC721URIStorage {
    using Counters for Counters.Counter;
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
