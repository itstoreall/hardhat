require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY || "http://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK || "0xKey"
// const COINMARKETCAP_API_KEY = process.env.API_KEY_COINMARKETCAP || "Key"
const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN || "Key"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    // localhost: {
    //   chainId: 31337,
    // },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "ETH",
  },
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 100000, // 30 sec max
  },
}
