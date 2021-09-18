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
    mapping (address => uint256) public _tokenAddressToId;
    mapping (uint256 => address) public _tokenIdtoAdderss;    
    mapping (uint256 => uint256) public _tokenPrices;
    mapping (uint256 => bool) public _forSale;

    modifier isForSale(uint256 tokenId) {
        require(_forSale[tokenId], "Contract is not currently for sale");
        _;
    }

    modifier isOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is neither owner nor approved");
        _;
    }

    // Mint an NFT for a smart contract that inherits from NFTContract.sol
    function mintContract(address _owner, address _contractAddress, uint256 price) external {
        require(_tokenAddressToId[_contractAddress]==0, "Contract already minted");
        _tokenAddressToId[_contractAddress] = tokenCount;
        _tokenIdtoAdderss[tokenCount] = _contractAddress;
        _tokenPrices[tokenCount] = price;
        _forSale[tokenCount] = false;
        _safeMint(_owner, tokenCount);
        tokenCount++;
    }

    function setPrice(uint256 tokenId, uint256 price) external isOwner(tokenId) {
        _tokenPrices[tokenId] = price;
    }

    // Change the sale status of an NFT if the sale status of an NFT is false, it can no longer be pruchased using the purchaseNFT function
    function setSaleStatus(uint256 tokenId, bool saleStatus) external isOwner(tokenId) {
        _forSale[tokenId] = saleStatus;
    }

    // Change ownership of an NFT currently on sale
    function purchaseNFT(uint256 tokenId, address to) external payable isForSale(tokenId) {
        uint256 price = _tokenPrices[tokenId];
        require(msg.value>=price*(1 wei), "Not enough money");

        // Transfer record of ownership
        address currentOwner = ownerOf(tokenId);
        _transfer(currentOwner, to, tokenId);
        _updateOwnershipInNFT(tokenId, to);

        // Pay the original owner and refund the excess money to the buyer
        address payable owner = payable(ownerOf(tokenId));
        address payable buyer = payable(msg.sender);
        owner.transfer(price);
        buyer.transfer(msg.value-price);

        // Set sale status to false
        _forSale[tokenId] = false;
    }

    function _updateOwnershipInNFT(uint256 tokenId, address to) private {
        NFTContract nft = NFTContract(_tokenIdtoAdderss[tokenId]);
        nft.transferOwnership(to);
    }

    // Overriding base transfer functions to include _updateOwnershipNFT
    function transferFrom(address from, address to, uint256 tokenId) public virtual override isOwner(tokenId) {
        _transfer(from, to, tokenId);
        _updateOwnershipInNFT(tokenId, to);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
        _updateOwnershipInNFT(tokenId, to);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override isOwner(tokenId) {
        _safeTransfer(from, to, tokenId, _data);
        _updateOwnershipInNFT(tokenId, to);
    }

    function getAllNFTDetails() public view returns(NFT[] memory) {
        NFT[] memory nftDetails = new NFT[](tokenCount-1);
        for (uint i=1; i<tokenCount; i++) {
            if (_tokenIdtoAdderss[i]!=address(0)){
            nftDetails[i-1] = NFT(i, _tokenPrices[i], _forSale[i], _tokenIdtoAdderss[i]);
            }
        }
        return nftDetails;
    }

    function getNFTDetails(uint256 tokenId) public view returns(NFT memory) {
        NFT memory nftDetails = NFT(tokenId, _tokenPrices[tokenId], _forSale[tokenId], _tokenIdtoAdderss[tokenId]);
        return nftDetails;
    }
}