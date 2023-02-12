// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./CitizenAccount.sol";

contract CitizenAccountFactory {
    CitizenAccount[] public accounts;

    function CreateAccount() public {
        CitizenAccount newAccount = new CitizenAccount();
        accounts.push(newAccount);
    }

    function accStore(uint256 _citizenAccountIdx, uint256 _citizenAccountNumber) public {
        accounts[_citizenAccountIdx].store(_citizenAccountNumber);
    }

    function accGet(uint256 _citizenAccountIdx) public view returns(uint256) {
        return accounts[_citizenAccountIdx].retrieve();
    }
}