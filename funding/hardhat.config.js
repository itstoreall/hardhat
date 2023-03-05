require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
// require("./tasks/tasks");

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY || "http://eth-goerli";
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK || "0xKey";
const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN || "Key";
const COINMARKETCAP_API_KEY = process.env.API_KEY_COINMARKETCAP || "Key";

module.exports = {
  // defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      // accounts: 'Hardhat wallets',
      chainId: 31337,
    },
  },
  // solidity: "0.8.17",
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
