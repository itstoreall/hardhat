// function deployFunc() {
//   console.log("Hi!!!");
// }

// module.exports.default = deployFunc;

// ---

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };

// ---

// const {
//   networkConfig,
//   developmentChains,
// } = require("../helper-hardhat-config");
const hreCfg = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN;

module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre;

  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const customNetwork = hreCfg.developmentChains.includes(network.name);

  let ethUsdPriceFeedAddress;

  if (customNetwork) {
    const ethUsdAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else
    ethUsdPriceFeedAddress = hreCfg.networkConfig[chainId]["ethUsdPriceFeed"];

  const args = [ethUsdPriceFeedAddress];

  const funding = await deploy("Funding", {
    from: deployer,
    args: args, // put price feed address from constructor
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log("---------------------- 01 ----------------------");

  if (!customNetwork && ETHERSCAN_API_KEY) await verify(funding.address, args);
};

module.exports.tags = ["all", "funding"];
