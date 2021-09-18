const ContractNFTHandler = artifacts.require('./ContractNFTHandler.sol');
const SampleNFTContract = artifacts.require("SampleNFTContract");
const assert = require("chai").assert;

const initializeContracts = async (accounts) => {
    let handler = await ContractNFTHandler.deployed();
    const nftContract = await SampleNFTContract.new(accounts[0]);
    await nftContract.changeHandlerContract.sendTransaction(handler.address)
    await handler.mintContract(nftContract.address, 1234, {from:accounts[0]});
    return {handler, nftContract}
}

contract("Test minting function", accounts => {
    let handler, nftContract;
    it("Minted NFT successfully", async () => {
        ({handler, nftContract} = await initializeContracts(accounts));
        const nfts = await handler.getAllNFTDetails();
        const nft = await handler.getNFTDetails(1);
        const balance = await handler.balanceOf(accounts[0])
        assert.equal(nfts[0][3], nftContract.address);
        assert.equal(nft[3], nftContract.address);
        assert.equal(balance, 1);
    })

    it("Successfully rejected duplicate minting", async () => {
        try {
            await handler.mintContract(nftContract.address, 1234, {from:accounts[0]});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "Contract already minted";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
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
    let handler, nftContract;
    it("Successfully rejected invalid purchases", async () => {
        ({handler, nftContract} = await initializeContracts(accounts));
        try {
            await handler.purchaseNFT.sendTransaction(1, accounts[5], {value:1234})
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "Contract is not currently for sale";
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
    let handler, nftContract
    it("Transferred NFT successfully", async () => {
        ({handler, nftContract} = await initializeContracts(accounts));
        await handler.transferFrom.sendTransaction(accounts[0], accounts[1], 1, {from: accounts[0]});
        const newOwner = await nftContract.owner();
        assert.equal(newOwner, accounts[1]);
    })

    it("Successfully rejected invalid transfers", async () => {
        try {
            await handler.transferFrom.sendTransaction(accounts[5], accounts[4], 1, {from: accounts[5]});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            const errorMessage = "ERC721: caller is not owner";
            assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
        }
        
    })
})

contract("Test burning of contract", accounts => {
    it("Burned NFT successfully", async () => {
        let {handler, nftContract} = await initializeContracts(accounts);
        await handler.burnContract.sendTransaction(1, {from:accounts[0]});
        const nfts = await handler.getAllNFTDetails();
        assert.equal(nfts[0][3], '0x0000000000000000000000000000000000000000')
    })
})

// contract("Test rejection of burn function", accounts => {
//     it("Successfully rejected invalid burn", async () => {
//         let {handler, nftContract} = await initializeContracts(accounts);
//         const nfts = await handler.getAllNFTDetails();
//         console.log(nfts)
//         try {
//             await handler.burnContract.sendTransaction(1, {from:accounts[2]});
//             assert.fail("The transaction should have thrown an error");
//         }
//         catch (err) {
//             const errorMessage = "ERC721: caller is not owner";
//             assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
//         }
//     })
// })
    
    