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
        assert.equal(nfts[nfts.length-1][3], nftContract.address)
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

contract("Test purchase function for handler", accounts => {
    it("Purchased NFT succesfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.setSaleStatus(1, true, {from: accounts[0]})
        await handler.purchaseNFT.sendTransaction(1, accounts[5], {value:1234})
        const newOwner = await nftContract.owner();
        assert.equal(newOwner, accounts[5]);
    })

    it("Successfully rejected invalid purchases", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
    })
})

contract("Test transfer function for handler", accounts => {
    it("Transferred NFT successfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.transferNFT.sendTransaction(1, accounts[1], {from: accounts[0]});
        const newOwner = await nftContract.owner();
        assert.equal(newOwner, accounts[1]);
    })

    it("Successfully rejected invalid transfers", async () => {
        
    })
})