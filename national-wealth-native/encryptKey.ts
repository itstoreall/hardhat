import { ethers } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

const encryptKey = async () => {
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY_METAMASK!
        // process.env.PRIVATE_KEY_GANACHE
    )
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD!,
        process.env.PRIVATE_KEY_METAMASK!
        // process.env.PRIVATE_KEY_GANACHE
    )
    console.log(encryptedJsonKey)
    fs.writeFileSync('./.encryptedKey.json', encryptedJsonKey)
}

encryptKey()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

/*

PRIVATE_KEY_METAMASK=...  PRIVATE_KEY_PASSWORD=... ts-node encryptKey.ts

*/
