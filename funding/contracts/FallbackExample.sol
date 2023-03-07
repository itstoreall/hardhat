// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract FallbackExample {
  uint256 public result;

  /* The receive function is executed on 
    a call to the contract with empty calldata */
  receive() external payable {
    result = 1;
  }

  /* The fallback function is executed on a 
    call to the contract if none of the other 
    functions match the given function signature, 
    or if no data was supplied at all and there 
    is no receive Ether function */
  fallback() external payable {
    result = 2;
  }
}

//  Ether is sent to contract
//        is msg.data empty?
//              /     \
//            yes      no
//            /         \
//       receive()?   fallback()
//        /     \
//      yes      no
//      /         \
//  receive()  fallback()
