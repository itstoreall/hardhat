import { ethers } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

const CitizenAccountAbi = './CitizenAccount_sol_CitizenAccount.abi'
const CitizenAccountBin = './CitizenAccount_sol_CitizenAccount.bin'

const deploy = async () => {
    const provider = new ethers.providers.JsonRpcBatchProvider(
        process.env.RPC_URL_ALCHEMY!
        // process.env.RPC_URL_GANACHE
    )

    let wallet = new (ethers.Wallet.fromEncryptedJsonSync as any)(
        fs.readFileSync('./.encryptedKey.json', 'utf8'),
        process.env.PRIVATE_KEY_PASSWORD!
    ).connect(provider)

    const abi = fs.readFileSync(CitizenAccountAbi, 'utf8')
    const binary = fs.readFileSync(CitizenAccountBin, 'utf8')

    // /* ================== Deploy contract
    const factory = new ethers.ContractFactory(abi, binary, wallet)
    console.log('Deploying, please wait...')
    const contract = await factory.deploy()
    await contract.deployTransaction.wait(1)
    // const deploymentReceipt = await contract.deployTransaction.wait(1)
    console.log('Contract address:', contract.address) // *
    // console.log('Tx Receipt:', deploymentReceipt) // *
    // console.log('Tx Response:', contract.deployTransaction); // *
    // ================== */

    /* ================== Update number
    const number = await contract.retrieve()
    console.log('number:', number.toString())
    const txResponse = await contract.store('7')
    const txReceipt = await txResponse.wait(1)
    const updatedNumber = await contract.retrieve()
    console.log('updatedNumber:', updatedNumber.toString())
    // ================== */
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(`Deploy ${error}`)
        process.exit(1)
    })

/*

1.
PRIVATE_KEY_METAMASK=...  PRIVATE_KEY_PASSWORD=... ts-node encryptKey.ts

2.
PRIVATE_KEY_METAMASK=... RPC_URL_ALCHEMY=... PRIVATE_KEY_PASSWORD=... ts-node deployToTestnet.ts

Result:

Deploying, please wait...
Contract address: 0xF02385bc812F55E6408457294Fdf63B59f7B134C
number: 0
updatedNumber: 7

*/
