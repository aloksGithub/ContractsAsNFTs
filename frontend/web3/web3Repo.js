// const Web3 = require("web3");
import Web3 from "web3";
import NFTContract from "../../contract_code/build/contracts/NFTContract.json";
import ContractNFTHandler from "../../contract_code/build/contracts/ContractNFTHandler.json"
import SampleNFTContract from "../../contract_code/build/contracts/SampleNFTContract.json";

class GetterConnection {
    constructor () {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        this.handler = new this.web3.eth.Contract(ContractNFTHandler.abi, '0xa50E9Bc001739c10C20C44C5c7055dACe830598D')
    }

    getAll = async () => {
        let data = await this.handler.methods.getAllNFTDetails().call();
        data = data.map(nft => {
            return {
                id: nft[0], 
                name: "temp", 
                description: "temp", 
                owner: "temp", 
                address: nft[3], 
                onSale: nft[2], 
                price: nft[1], 
                link: "temp"}
        })
        return data
    }

    getNFT = async (id) => {
        let data = await this.handler.methods.getNFTDetails(id).call();
        return {
            id: data[0], 
            name: "temp", 
            description: "temp", 
            owner: "temp", 
            address: data[3], 
            onSale: data[2], 
            price: data[1], 
            link: "temp"
        }
    }
}

class MetaMaskConnection {
    constructor () {
        const ethEnable = async () => {
            await window.ethereum.send('eth_requestAccounts');
            this.web3 = new Web3(window.ethereum);
            const accounts = await this.web3.eth.getAccounts();
            this.account = accounts[0]
            this.handler = new this.web3.eth.Contract(ContractNFTHandler.abi, '0xa50E9Bc001739c10C20C44C5c7055dACe830598D')
        }
        ethEnable.bind(this)();
    }
}

const getter = new GetterConnection()
const metaMask = MetaMaskConnection
export {getter, metaMask}