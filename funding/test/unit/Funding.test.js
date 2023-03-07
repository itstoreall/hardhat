const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
// const { developmentChains } = require("../../helper-hardhat-config");

describe("Funding", async () => {
  let deployer;
  let funding;
  let mockV3Aggregator;
  const sendValue = ethers.utils.parseEther("0.05"); // 1000000000000000000 - 1 ETH

  beforeEach(async () => {
    /*
    const accounts = await ethers.getSigner();
    const accZero = accounts[0];
    */

    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    funding = await ethers.getContract("Funding", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async () => {
    it("sets the aggregator addresses correctly", async () => {
      const response = await funding.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
  });

  describe("fund", async () => {
    it("Failes if you don't send enough ETH", async () => {
      await expect(funding.fund()).to.be.revertedWith(
        "Didn't sent enough ETH!"
      ); // or just - to.be.reverted
    });
    it("updated the amount funded data structure", async () => {
      await funding.fund({ value: sendValue });
      const response = await funding.addressToAmountFunded(deployer);
      assert.equal(response.toString(), sendValue.toString());
    });
  });
});
