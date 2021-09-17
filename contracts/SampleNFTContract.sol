// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8;

contract SampleNFTContract {
    address public owner;
    address public handlerContract;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier isAuthorized() {
        require(msg.sender == owner || msg.sender == handlerContract);
        _;
    }

    function changeHandlerContract(address newHandler) external isAuthorized {
        handlerContract = newHandler;
    }

    function transferOwnership(address newOwner) external isAuthorized {
        owner = newOwner;
    }
}
