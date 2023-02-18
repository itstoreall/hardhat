import { task } from 'hardhat/config'

export const blockNumber = task(
  'block-number',
  'Prints the current block number',
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log('Block number:', blockNumber)
  }
)

export const accounts = task(
  'accounts',
  'Prints the list of accounts',
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    for (const account of accounts) {
      console.log('account:', account.address)
    }
  }
)

module.exports = {}
