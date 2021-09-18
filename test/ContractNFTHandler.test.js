const ContractNFTHandler = artifacts.require('./ContractNFTHandler.sol');
const SampleNFTContract = artifacts.require("SampleNFTContract");
const assert = require("chai").assert;

const initializeContracts = async (accounts) => {
    let handler = await ContractNFTHandler.deployed();
    const nftContract = await SampleNFTContract.new(accounts[0]);
    await nftContract.changeHandlerContract.sendTransaction(handler.address)
    await handler.mintContract(accounts[0], nftContract.address, 1234);
    return {handler, nftContract}
}

contract("Test minting function", accounts => {
    it("Minted NFT successfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        const nfts = await handler.getAllNFTDetails();
        const nft = await handler.getNFTDetails(1);
        const balance = await handler.balanceOf(accounts[0])
        assert.equal(nfts[0][3], nftContract.address);
        assert.equal(nft[3], nftContract.address);
        assert.equal(balance, 1);
    })

    it("Successfully rejected duplicate minting", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        try {
            await handler.mintContract(accounts[0], nftContract.address, 1234);
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    })
})

contract("Test price setting funtcion", accounts => {
    it("Successfully updated price", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.setPrice.sendTransaction(1, 123, {from: accounts[0]});
        const nft = await handler.getNFTDetails(1);
        assert.equal(nft[1], 123);

    })
})

contract("Test purchase function for handler", accounts => {
    it("Purchased NFT succesfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.setSaleStatus(1, true, {from: accounts[0]})
        await handler.purchaseNFT.sendTransaction(1, accounts[5], {value:1234})
        const newOwner = await nftContract.owner();
        assert.equal(newOwner, accounts[5]);
    })
})

contract("Test rejection of purchases", accounts => {
    it("Successfully rejected invalid purchases", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        try {
            await handler.purchaseNFT.sendTransaction(1, accounts[5], {value:1234})
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "revert Contract is not currently for sale";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
        try {
            await handler.setSaleStatus(1, true, {from: accounts[0]})
            await handler.purchaseNFT.sendTransaction(1, accounts[5], {value:12})
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "revert Not enough money";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
        try {
            await handler.purchaseNFT.sendTransaction(999, accounts[5], {value:1234})
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "revert Contract is not currently for sale";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
    })
})

contract("Test transfer function for handler", accounts => {
    it("Transferred NFT successfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.transferFrom.sendTransaction(accounts[0], accounts[1], 1, {from: accounts[0]});
        const newOwner = await nftContract.owner();
        assert.equal(newOwner, accounts[1]);
    })

    it("Successfully rejected invalid transfers", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        try {
            await handler.transferFrom.sendTransaction(accounts[5], accounts[4], 1, {from: accounts[5]});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "ERC721: caller is neither owner nor approved";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
        
    })
})