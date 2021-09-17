const ContractNFTHandler = artifacts.require("ContractNFTHandler");

module.exports = function (deployer) {
  deployer.deploy(ContractNFTHandler, "abcd", "1234");
};
