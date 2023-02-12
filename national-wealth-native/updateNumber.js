import ethers from 'ethers';
import fs from 'fs-extra';
import dotenv from 'dotenv';
dotenv.config();

const CitizenAccountAbi = './CitizenAccount_sol_CitizenAccount.abi';
const CitizenAccountBin = './CitizenAccount_sol_CitizenAccount.bin';

const deploy = async () => {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.RPC_URL_GANACHE
  );

  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    fs.readFileSync('./.encryptedKey.json', 'utf8'),
    process.env.PRIVATE_KEY_PASSWORD
  ).connect(provider);

  const abi = fs.readFileSync(CitizenAccountAbi, 'utf8');
  const binary = fs.readFileSync(CitizenAccountBin, 'utf8');

  // /* ================== Deploy contract
  const factory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await factory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  // console.log('Tx Receipt:', deploymentReceipt); // *
  // console.log('Tx Response:', contract.deployTransaction); // *
  // ================== */

  const number = await contract.retrieve();
  console.log('number:', number.toString());

  const txResponse = await contract.store('7');
  const txReceipt = await txResponse.wait(1);
  const updatedNumber = await contract.retrieve();
  console.log('updatedNumber:', updatedNumber.toString());
};

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(`Deploy ${error}`);
    process.exit(1);
  });

/*

Result:

PRIVATE_KEY_PASSWORD=password node updateNumber.js
Deploying, please wait...
number: 0
updatedNumber: 7

*/
