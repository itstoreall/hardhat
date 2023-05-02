const { network, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle staging tests", () => {
      let raffle, raffleEntranceFee, deployer

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        raffle = await ethers.getContract("Raffle", deployer)
        raffleEntranceFee = await raffle.getEntranceFee()
      })

      describe("fulfillRandomWords", () => {
        it("works with live Chainlink Keepers and Chainlink VRF (get random winner)", async () => {
          const startingTimestamp = await raffle.getLatestTimestamp()
          const accounts = await ethers.getSigners()

          await new Promise(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
              // in config -> mocha timeout
              console.log("WinnerPicked event fired")

              try {
                const recentWinner = await raffle.getRecentWinner()
                const raffleState = await raffle.getRaffleState()
                const winnerEndingBalance = await accounts[0].getBalance()
                const endingTimestamp = await raffle.getLatestTimestamp()

                await expect(raffle.getPlayer(0)).to.be.reverted
                assert.equal(recentWinner.toString(), accounts[0].address)
                assert.equal(raffleState, 0) // OPEN
                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(raffleEntranceFee).toString()
                )
                assert(endingTimestamp > startingTimestamp)

                resolve()
              } catch (e) {
                console.log(e)
                reject(e)
              }

              // await raffle.enterRaffle({ value: raffleEntranceFee })
              // const winnerStartingBalance = await accounts[0].getBalance()
            })

            console.log("Entering Raffle...")
            const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
            await tx.wait(1)

            console.log("Ok, time to wait...")
            const winnerStartingBalance = await accounts[0].getBalance()
          })
        })
      })
    })
