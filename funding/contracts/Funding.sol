// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./PriceConverter.sol";

error NotOwner();

contract Funding {
  using PriceConverter for uint256;

  uint256 public constant MINIMUM_USD = 0.02 * 1e18; // 1 * 10 ** 18
  // 0.02 / 1625 = 0.000012484592145 (12400000000000 Wei)

  address[] public funders;
  mapping(address => uint256) public addressToAmountFunded;

  address public immutable i_owner;

  AggregatorV3Interface public priceFeed;

  constructor(address priceFeedAddress) {
    i_owner = msg.sender;
    priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  function fund() public payable {
    require(
      msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
      "Didn't sent enough!"
    );

    // 1e18 == 1 * 10 ** 18 == 1000000000000000000
    // 18 decimals

    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] += msg.value;
  }

  function withdraw() public onlyOwner {
    for (uint256 funderIdx = 0; funderIdx < funders.length; funderIdx++) {
      address funder = funders[funderIdx];
      addressToAmountFunded[funder] = 0;
    }

    funders = new address[](0);

    // Call
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "Call failed");

    // Transfer (to each other)
    // payable(msg.sender).transfer(address(this).balance);

    // Send
    // bool sendSuccess = payable(msg.sender).send(address(this).balance);
    // require(sendSuccess, "Send failed");
  }

  modifier onlyOwner() {
    // require(msg.sender == i_owner, "Sender in not owner!"); // not optimized
    if (msg.sender != i_owner) {
      revert NotOwner();
    } // optimized
    _;
  }

  receive() external payable {
    fund();
  }

  fallback() external payable {
    fund();
  }
}
