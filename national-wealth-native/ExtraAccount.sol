// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./CitizenAccount.sol";

contract ExtraAccount is CitizenAccount {
    function store(uint256 _acc) public override {
        bank_account = _acc + 5;
    }
}
