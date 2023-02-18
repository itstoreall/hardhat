// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./NationalWealth.sol";

contract CitizenAccount is NationalWealth {
    uint256 bank_account;

    struct Citizen {
        uint256 bank_account;
        string name;
    }

    Citizen[] public citizens;

    function store(uint256 _acc) public virtual {
        bank_account = _acc;
    }

    function retrieve() public view returns (uint256) {
        return bank_account;
    }

    function addPerson(string calldata _name, uint256 _acc) public {
        citizens.push(Citizen(_acc, _name));
        NationalWealth.findCitizenByAccount[_acc] = _name;
    }
}
