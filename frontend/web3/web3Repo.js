// const Web3 = require("web3");
import Web3 from "web3";
import NFTContract from "./build/contracts/NFTContract.json";
import ContractNFTHandler from "./build/contracts/ContractNFTHandler.json";
import SampleNFTContract from "./build/contracts/SampleNFTContract.json";

class ContractConnection {
    constructor () {
        const ethEnable = async () => {
            if (window.ethereum) {
                await window.ethereum.send('eth_requestAccounts');
                this.web3 = new Web3(window.ethereum);
                const accounts = await this.web3.eth.getAccounts();
                this.account = accounts[0]
                this.handler = new this.web3.eth.Contract(ContractNFTHandler.abi, '0xa50E9Bc001739c10C20C44C5c7055dACe830598D')
            }
        }
        ethEnable.bind(this)();
    }
    
    getAll = async () => {
        const data = await this.handler.methods.getAllNFTDetails().call();
        console.log(data)
        return data
    }
}

export default new ContractConnection();