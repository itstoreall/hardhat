const { ethers, run, network } = require('hardhat')

const deploy = async () => {
  const CitizenAccountFactory = await ethers.getContractFactory(
    'CitizenAccount'
  )
  console.log('Deploying contract...')
  const citizenAccount = await CitizenAccountFactory.deploy()
  await citizenAccount.deployed()
  console.log('citizenAccount:', citizenAccount.address)

  if (network.config.chainId === 5 && process.env.API_KEY_ETHERSCAN) {
    await citizenAccount.deployTransaction.wait(6)
    await verify(citizenAccount.address, [])
  }

  const currentValue = await citizenAccount.retrieve()
  console.log('Current value:', currentValue)

  const txResponse = await citizenAccount.store(7)
  await txResponse.wait(1)

  const updatedValue = await citizenAccount.retrieve()
  console.log('Updated value:', updatedValue)
}

const verify = async (contractAddress, args) => {
  console.log('Verifying contract...')

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log('Error in verify() (deploy.js)', e)
    }
  }
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`Deploy ${error}`)
    process.exit(1)
  })
