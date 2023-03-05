// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
  function getPrice(
    AggregatorV3Interface priceFeed
  ) internal view returns (uint256) {
    // ABI
    // address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e

    // AggregatorV3Interface priceFeed = AggregatorV3Interface(
    //   0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    // );

    (, int price, , , ) = priceFeed.latestRoundData();

    // ETH in terms of USD
    // 1655.00000000

    return uint256(price * 1e10); // 1**10 == 10000000000
  }

  /*
  function getVersion() internal view returns (uint256) {
    AggregatorV3Interface priceFeed = AggregatorV3Interface(
      0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    );
    return priceFeed.version();
  }
  */

  function getConversionRate(
    uint256 ethAmount,
    AggregatorV3Interface priceFeed
  ) internal view returns (uint256) {
    uint256 ethPrice = getPrice(priceFeed);

    // 1655_000000000000000000 = ETH / USD price
    // 1_000000000000000000 ETH

    uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
    return ethAmountInUsd;
  }
}
