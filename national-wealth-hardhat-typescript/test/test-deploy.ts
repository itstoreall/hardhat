import { ethers } from 'hardhat'
import { expect, assert } from 'chai'
// import { Contract } from 'ethers'
import { CitizenAccount, CitizenAccount__factory } from '../typechain-types'

describe('citizenAccount', () => {
  let citizenAccountFactory: CitizenAccount__factory
  let citizenAccount: CitizenAccount

  beforeEach(async () => {
    citizenAccountFactory = (await ethers.getContractFactory(
      'CitizenAccount'
    )) as CitizenAccount__factory
    citizenAccount = await citizenAccountFactory.deploy()
  })

  it('Should start with 0', async () => {
    const currentValue = await citizenAccount.retrieve()
    const expectedValue = '0'

    // console.log('citizenAccount', citizenAccount)

    assert.equal(currentValue.toString(), expectedValue)
  })

  it('Should update to 7', async () => {
    const exepctedValue = '7'
    const txResponse = await citizenAccount.store(exepctedValue)
    await txResponse.wait(1)

    const currentValue = await citizenAccount.retrieve()
    assert.equal(currentValue.toString(), exepctedValue)
  })
})
