// const ContractNFTHandler = artifacts.require('./ContractNFTHandler.sol');
// const SampleNFTContract = artifacts.require("SampleNFTContract");

// contract("SampleNFTContract", accounts => {
//     it("Deployed sample NFT successfully", async () => {
//         let handler = await ContractNFTHandler.deployed();
//         const nftContract = await SampleNFTContract.new(accounts[0]);
//         await nftContract.changeHandlerContract.sendTransaction(handler.address)
//         const ownerAddress = await nftContract.getOwner();
//         const handlerAddress = await nftContract.getHandlerContract();
//         assert.equal(ownerAddress, accounts[0]);
//         assert.equal(handler.address, handlerAddress)
//     })
// })

// contract("Test transfer ownership", accounts => {
//     it("Sample NFT transferred ownership successfully", async () => {
//         const nftContract = await SampleNFTContract.new(accounts[0]);
//         const oldOwner = await nftContract.getOwner();
//         assert.equal(oldOwner, accounts[0]);
//         await nftContract.transferOwnership.sendTransaction(accounts[1], {from:accounts[0]});
//         const newOwner = await nftContract.owner();
//         assert.equal(newOwner, accounts[1]);
//         assert.notEqual(newOwner, accounts[0])
//     })

//     it("Successfully rejected invalid transfer request", async () => {
//         try{
//             const nftContract = await SampleNFTContract.new(accounts[0]);
//             await nftContract.transferOwnership.sendTransaction(accounts[1], {from:accounts[2]});
//             assert.fail("The transaction should have thrown an error");
//         }
//         catch (err) {
//             const errorMessage = "Unauthorized access";
//             assert.include(err.message, errorMessage, `The error message should contain ${errorMessage}`);
//         }
//     })
// })