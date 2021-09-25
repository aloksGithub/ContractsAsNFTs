# ContractsAsNFTs
Smart contracts can have owners that can excercise authority over the smart contract. Smart contracts can be programmed such that this ownership is transferrable. In the event that contract ownership needs to be traded for some asset, trust is needed between the two parties. This issue can be overcome if contract ownership is made into an NFT. This would allow payment and ownership transfer to be carried out in a trustless manner.

In order to turn contract ownership into NFTs, the following are needed:
1) There needs to be a smart contract that keeps track of ownership of other contracts and facilitates the trading of their ownership. This contract is defined in "/contracts/ContractNFTHandler.sol".
2) The contracts that are traded need to follow an interface. This interface is defined in "/contracts/NFTContract.sol".
3) Buyers of contract ownership need to veryify the contract's code whose ownership they are buying, in order to make sure that there are no backdoor functions that would allow the previous owner to take back ownership of the contract.

# Requirements
1) npm/yarn
2) Truffle and ganache (Currently, the smart contract can only be deployed locally)

# Setup
1) Create a local blockchain in ganache and add /contract_code/truffle-config.js as a project to it
2) Run npm install in the contract_code and frontend directory

# Deployment
1) Run truffle migrate --network=development in the contract_code directory
2) Run npm run dev in the frontend directory
