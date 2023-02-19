// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract SafeMathTester {
  uint8 public bigNumber = 255;

  function addOneToBigNumber() public {
    bigNumber = bigNumber + 1;
  }

  function addWithUnchecked() public {
    unchecked {
      bigNumber = bigNumber + 1;
    }
  }
}
