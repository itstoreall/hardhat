const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium (0.25 LINK per request)
const GAS_PRICE_LINK = 1e9 // 1000000000 | calculated value based on the gas of the chain

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  // const chainId = network.config.chainId

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploing mocks......")

    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    })

    log("Mocks deployed!")
    log("---------------------- 00 ----------------------")
  }
}

module.exports.tags = ["all", "mocks"]
