// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./PriceConverter.sol";
import "hardhat/console.sol";

// Interfaces, Libraries, Contracts (Style Guide)

/** (Style Guide)
 * @title A contract for funding
 * @author Serhii
 * @notice This contract is demo for Funding contract
 * @dev This implements price feeds as our library
 */
contract Funding {
  // Type declarations (Style Guide)
  using PriceConverter for uint256;

  // State variables (Style Guide)
  mapping(address => uint256) private s_addressToAmountFunded;
  address[] private s_funders;
  address private immutable i_owner;
  uint256 public constant MINIMUM_USD = 0.02 * 1e18; // 1 * 10 ** 18
  // 0.02 / 1625 = 0.000012484592145 (12400000000000 Wei)

  AggregatorV3Interface private s_priceFeed;

  // Modifiers (Style Guide)
  modifier onlyOwner() {
    // require(msg.sender == i_owner, "Sender in not owner!"); // not optimized
    if (msg.sender != i_owner) revert Funding__NotOwner(); // optimized
    _;
  }

  // Errors (Style Guide)
  error Funding__NotOwner();

  // Functions order (Style Guide):
  // constructor
  // receive
  // fallback
  // external
  // public
  // internal
  // private
  // view / pure

  constructor(address priceFeedAddress) {
    i_owner = msg.sender;
    s_priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  /*
  receive() external payable {
    fund();
  }

  fallback() external payable {
    fund();
  }
  */

  /** (Style Guide)
   * @notice This function funds this contract
   * @dev This implements price feeds as our library
   */
  function fund() public payable {
    require(
      msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
      "Didn't sent enough ETH!"
    );

    // 1e18 == 1 * 10 ** 18 == 1000000000000000000

    s_funders.push(msg.sender);
    s_addressToAmountFunded[msg.sender] += msg.value;
  }

  function withdraw() public onlyOwner {
    for (uint256 funderIdx = 0; funderIdx < s_funders.length; funderIdx++) {
      address funder = s_funders[funderIdx];
      s_addressToAmountFunded[funder] = 0;
    }

    console.log("!!!!! ---> withdraw");

    s_funders = new address[](0);

    // Call
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "Call failed");

    /*
    Transfer (to each other)
    payable(msg.sender).transfer(address(this).balance);

    Send
    bool sendSuccess = payable(msg.sender).send(address(this).balance);
    require(sendSuccess, "Send failed");
    */
  }

  function cheaperWithdraw() public payable onlyOwner {
    address[] memory funders = s_funders;
    // mappings can't be in memory!
    for (uint256 funderIdx = 0; funderIdx < funders.length; funderIdx += 1) {
      address funder = funders[funderIdx];
      s_addressToAmountFunded[funder] = 0;
    }

    s_funders = new address[](0);
    (bool success, ) = i_owner.call{value: address(this).balance}("");
    require(success);
  }

  function getOwner() public view returns (address) {
    return i_owner;
  }

  function getFunder(uint256 idx) public view returns (address) {
    return s_funders[idx];
  }

  function getAddressToAmountFunded(
    address funder
  ) public view returns (uint256) {
    return s_addressToAmountFunded[funder];
  }

  function getPriceFeed() public view returns (AggregatorV3Interface) {
    return s_priceFeed;
  }
}
