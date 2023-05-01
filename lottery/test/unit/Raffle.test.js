const { network, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

const enterRaffle = async (args) => {
  const { raffle, network, raffleEntranceFee, interval } = args

  await raffle.enterRaffle({ value: raffleEntranceFee })
  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
  await network.provider.request({ method: "evm_mine", params: [] })
}

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle", () => {
      let raffle, vrfCoordinatorV2Mock, raffleEntranceFee, deployer, interval, enterRaffleArgs
      const chainId = network.config.chainId

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])

        raffle = await ethers.getContract("Raffle", deployer)
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
        raffleEntranceFee = await raffle.getEntranceFee()
        interval = await raffle.getInterval()

        enterRaffleArgs = { raffle, network, raffleEntranceFee, interval }
      })

      describe("constructor", () => {
        it("initializes the raffle correctly", async () => {
          const raffleState = await raffle.getRaffleState()

          assert.equal(raffleState.toString(), "0")
          assert.equal(interval.toString(), networkConfig[chainId]["interval"])
        })
      })

      describe("enterRaffle", () => {
        it("reverts when you don't pay enough", async () => {
          await expect(raffle.enterRaffle()).to.be.revertedWith("Raffle__NotEnoughETHEntered")
        })

        it("records players when they enter", async () => {
          await raffle.enterRaffle({ value: raffleEntranceFee })
          const playerFromContract = await raffle.getPlayer(0)

          assert.equal(playerFromContract, deployer)
        })

        it("emits event of enter", async () => {
          await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.emit(
            raffle,
            "RaffleEnter"
          )
        })

        it("doesnt allow entrance when raffle is calculating", async () => {
          await enterRaffle(enterRaffleArgs)
          await raffle.performUpkeep([]) // or ("0x")

          await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be.revertedWith(
            "Raffle__NotOpen"
          )
        })
      })

      describe("checkUpkeep", () => {
        it("returns false if people haven't sent any ETH", async () => {
          await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
          await network.provider.send("evm_mine", [])
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])

          assert(!upkeepNeeded)
        })

        it("returns false if raffle isn't open", async () => {
          await enterRaffle(enterRaffleArgs)
          await raffle.performUpkeep("0x") // or ([])
          const raffleState = await raffle.getRaffleState()
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])

          assert.equal(raffleState.toString(), "1")
          assert.equal(upkeepNeeded, false)
        })

        it("returns false if enough time hasn't passed", async () => {
          await raffle.enterRaffle({ value: raffleEntranceFee })
          await network.provider.send("evm_increaseTime", [interval.toNumber() - 5]) // use higher number if the test fails
          await network.provider.request({ method: "evm_mine", params: [] })
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")

          assert(!upkeepNeeded)
        })

        it("returns true if enough time has passed, players, eth, and isOpen", async () => {
          await enterRaffle(enterRaffleArgs)
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")

          assert(upkeepNeeded)
        })
      })

      describe("checkUpkeep", () => {
        it("it can only run if checkUpkeep is true", async () => {
          await enterRaffle(enterRaffleArgs)
          const tx = await raffle.performUpkeep([])

          assert(tx)
        })

        it("reverts when checkUpkeep is false", async () => {
          await expect(raffle.performUpkeep([])).to.be.revertedWith("Raffle__UpkeepNotNeeded")
        })

        it("updates the raffle state, emits an event, and calls the vrf coordinator", async () => {
          await enterRaffle(enterRaffleArgs)
          const tx = await raffle.performUpkeep([])
          const txReceipt = await tx.wait(1)
          const requestId = await txReceipt.events[1].args.requestId
          const raffleState = await raffle.getRaffleState()

          assert(requestId.toNumber() > 0)
          assert(raffleState.toString() == "1")
        })
      })

      describe("fulfillRandomWords", () => {
        beforeEach(async () => {
          await enterRaffle(enterRaffleArgs)
        })

        it("can only be called after performUpkeep", async () => {
          await expect(
            vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address)
          ).to.be.revertedWith("nonexistent request")

          await expect(
            vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address)
          ).to.be.revertedWith("nonexistent request")
        })
      })
    })
