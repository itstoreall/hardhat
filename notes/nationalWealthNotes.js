/*

*** Native ==========================

yarn add solc
yarn add ethers
yarn add fs-extra
ysrn add dotenv
yarn add --dev prettier prettier-plugin-solidity
sudo npm install -g ts-node
yarn add --dev typescript ts-node @types/fs-extra

CLI:
node deploy.js
RPC_URL_GANACHE=HTTP://0.0.0.0:7545 PRIVATE_KEY_PASSWORD=... node fileName.js
history (show history)
history -c (clear history)

"type": "module",

* Compile
yarn solcjs --bin --abi --include-path node-modules/ --base-path . -o . NationalWealth.sol

=============== Default async function:

const deploy = async () => {
  console.log('hi');
};

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

===========================

* .env:

yarn add dotenv
import dotenv from 'dotenv';
dotenv.config();
process.env.KEY

--

in CLI:
export CAT=dog
echo $CAT
dog

===========================

* Format abi (JSON):
change the .abi to .json
command + shift + P
>Format Document With...
Prettier - Code formatter (default)
change back .json to .abi


*** Hardhat ==========================

yarn init
yarn add --dev hardhat
yarn hardhat
yarn add --dev dotenv
yarn add --dev prettier prettier-plugin-solidity

.prettierrc
{
  "tabWidth": 2,
  "semi": false,
  "useTabs": false,
  "singleQuote": true
}

.prettierignore
{
  ...
}

--

yarn hardhat run scripts/deploy.js
yarn hardhat run scripts/deploy.js --network hardhat
yarn hardhat run scripts/deploy.js --network goerli
yarn add --dev @nomiclabs/hardhat-etherscan

hardhat.config.js
{
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

==========================

* Verify:

yarn hardhat verify --help
yarn hardhat run scripts/deploy.js

*** Sources ==========================

Decompiler
https://ethervm.io/decompile

Verifying contracts programmatically
https://docs.etherscan.io/tutorials/verifying-contracts-programmatically

Verifying contracts (hardhat plugin)
https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan

API Keys (Etherscan)
https://etherscan.io/myapikey

==========================

*/
