// const { task } = require('hardhat/config') // *
// require('@nomiclabs/hardhat-waffle') // *
require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('./tasks/tasks')
require('hardhat-gas-reporter')
require('solidity-coverage')

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY || 'http://eth-goerli'
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK || '0xKey'
const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN || 'Key'
const COINMARKETCAP_API_KEY = process.env.API_KEY_COINMARKETCAP || 'Key'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    defaultNetwork: 'hardhat',
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      // accounts: 'Hardhat wallets',
      chainId: 31337,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'ETH',
  },
}
