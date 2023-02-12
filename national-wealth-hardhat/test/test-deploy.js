const { ethers } = require('hardhat')
const { expect, assert } = require('chai')

describe('citizenAccount', () => {
  let citizenAccountFactory, citizenAccount

  beforeEach(async () => {
    citizenAccountFactory = await ethers.getContractFactory('CitizenAccount')
    citizenAccount = await citizenAccountFactory.deploy()
  })

  it('Should start with 0', async () => {
    const currentValue = await citizenAccount.retrieve()
    const expectedValue = '0'

    // console.log('citizenAccount', citizenAccount)

    assert.equal(currentValue.toString(), expectedValue)
  })

  it.only('Should update to 7', async () => {
    const exepctedValue = '7'
    const txResponse = await citizenAccount.store(exepctedValue)
    await txResponse.wait(1)

    const currentValue = await citizenAccount.retrieve()
    assert.equal(currentValue.toString(), exepctedValue)
  })
})
