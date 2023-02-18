// import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import '@nomiclabs/hardhat-etherscan'
import './tasks/tasks'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
}

export default config

const GOERLI_RPC_URL = process.env.RPC_URL_ALCHEMY || 'http://eth-goerli'
const PRIVATE_KEY = process.env.PRIVATE_KEY_METAMASK || '0xKey'
const ETHERSCAN_API_KEY = process.env.API_KEY_ETHERSCAN || 'Key'
const COINMARKETCAP_API_KEY = process.env.API_KEY_COINMARKETCAP || 'Key'

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
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'ETH',
  },
}
