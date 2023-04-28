/*

yarn commands:
yarn add --dev hardhat
yarn hardhat
yarn hardhat compile

yarn add -D @chainlink/contracts
yarn global add hardhat-shorthand
npm install -g hardhat-shorthand

mkdir lottery
yarn add --dev hardhat
yarn hardhat

for js:
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv 

for ts:
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node ts-node typechain typescript 

.prettierrc:
{
  "tabWidth": 4,
  "useTabs": false,
  "semi": false,
  "singleQuote": false,
  "printWidth": 100
}

hardhat.config.js:
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

yarn add -D @chainlink/contracts

================================

Sources:

https://github.com/PatrickAlphaC/hardhat-smartcontract-lottery-fcc
https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number
https://docs.soliditylang.org/en/v0.8.19/types.html#modulo
https://docs.chain.link/chainlink-automation/compatible-contracts
https://docs.soliditylang.org/en/v0.8.19/structure-of-a-contract.html#enum-types
https://docs.soliditylang.org/en/v0.8.19/units-and-global-variables.html
https://docs.chain.link/vrf/v2/subscription/supported-networks

*/
