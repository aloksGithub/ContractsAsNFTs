// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFTContract.sol";

contract ContractNFTHandler is ERC721 {
    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenCount = 1;
    }

    struct NFT {
        uint256 id;
        uint256 price;
        bool onSale;
        address contractAddress;
    }

    uint256 public tokenCount;
    mapping (uint256 => address) public _tokenIdToAddress;
    mapping (address => uint256) public _tokenAddressToId;
    mapping (uint256 => address) public _tokenOwners;
    mapping (uint256 => uint256) public _tokenPrices;
    mapping (uint256 => bool) public _forSale;

    modifier isOwnerOf(uint256 _tokenId) {
        require(_tokenOwners[_tokenId]==msg.sender, "Only the owner can call that function");
        _;
    }

    modifier isForSale(uint256 _tokenId) {
        require(_forSale[_tokenId], "Contract is not currently for sale");
        _;
    }

    // Mint an NFT for a smart contract that inherits from NFTContract.sol
    function mintContract(address _owner, address _contractAddress, uint256 price) external {
        require(_tokenAddressToId[_contractAddress]==0, "Contract already minted");
        _tokenIdToAddress[tokenCount] = _contractAddress;
        _tokenAddressToId[_contractAddress] = tokenCount;
        _tokenOwners[tokenCount] = _owner;
        _tokenPrices[tokenCount] = price;
        _forSale[tokenCount] = false;
        _safeMint(_owner, tokenCount);
        tokenCount++;
    }

    function setPrice(uint256 _tokenId, uint256 price) external isOwnerOf(_tokenId) {
        _tokenPrices[_tokenId] = price;
    }

    // Change the sale status of an NFT if the sale status of an NFT is false, it can no longer be pruchased using the purchaseNFT function
    function setSaleStatus(uint256 _tokenId, bool saleStatus) external isOwnerOf(_tokenId) {
        _forSale[_tokenId] = saleStatus;
    }

    // Change ownership of an NFT currently on sale to _to
    function purchaseNFT(uint256 _tokenId, address _to) external payable isForSale(_tokenId) {
        uint256 price = _tokenPrices[_tokenId];
        require(msg.value>=price*(1 wei), "Not enough money");

        // Transfer record of ownership in this contract
        address currentOwner = _tokenOwners[_tokenId];
        _transfer(currentOwner, _to, _tokenId);

        // Transfer ownership record in the contract being purchased
        NFTContract nft = NFTContract(_tokenIdToAddress[_tokenId]);
        nft.transferOwnership(_to);

        // Pay the original owner and refund the excess money to the buyer
        address payable owner = payable(_tokenOwners[_tokenId]);
        address payable buyer = payable(msg.sender);
        owner.transfer(price);
        buyer.transfer(msg.value-price);

        // Set sale status to false
        _forSale[_tokenId] = false;
    }

    // This function allows an NFT owner to transfer ownership to another account
    function transferNFT(uint256 _tokenId, address _to) external isOwnerOf(_tokenId) {
        // Transfer record of ownership in this contract
        _transfer(msg.sender, _to, _tokenId);

        // Transfer ownership record in the contract being purchased
        NFTContract nft = NFTContract(_tokenIdToAddress[_tokenId]);
        nft.transferOwnership(_to);
    }

    function getAllNFTDetails() public view returns(NFT[] memory) {
        NFT[] memory nftDetails = new NFT[](tokenCount);
        for (uint i=0; i<tokenCount; i++) {
            nftDetails[i] = NFT(i, _tokenPrices[i], _forSale[i], _tokenIdToAddress[i]);
        }
        return nftDetails;
    }

    function getNFTDetails(uint256 _tokenId) public view returns(NFT memory) {
        NFT memory nftDetails = NFT(_tokenId, _tokenPrices[_tokenId], _forSale[_tokenId], _tokenIdToAddress[_tokenId]);
        return nftDetails;
    }
}