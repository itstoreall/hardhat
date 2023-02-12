const { task } = require('hardhat/config')

require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('./tasks/tasks')

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK
const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
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
}
