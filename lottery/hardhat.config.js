require("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
// require("solidity-coverage")
// require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY || "http://eth-goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK || "0xKey"
// const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN || "Key"
// const COINMARKETCAP_API_KEY = process.env.API_KEY_COINMARKETCAP || "Key"

console.log(0)
console.log(0, GOERLI_RPC_URL)
console.log(0, PRIVATE_KEY)

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
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
}
