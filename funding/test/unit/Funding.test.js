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
    it("add funder to array of funders", async () => {
      await funding.fund({ value: sendValue });
      const funder = await funding.funders(0);
      assert.equal(funder, deployer);
    });
  });

  describe("fund", async () => {
    beforeEach(async () => await funding.fund({ value: sendValue }));
  });

  it("withdraw ETH from a single funder", async () => {
    const startFundBalance = await funding.provider.getBalance(funding.address);

    const startDeployerBalance = await funding.provider.getBalance(deployer);

    const transactionResponse = await funding.withdraw();
    const transactionReceipt = await transactionResponse.wait(1);

    const { gasUsed, effectiveGasPrice } = transactionReceipt;
    const gasCost = gasUsed.mul(effectiveGasPrice);

    const endFundBalance = await funding.provider.getBalance(funding.address);

    const endDeployerBalance = await funding.provider.getBalance(deployer);

    console.log("startFundBalance --->", startFundBalance.toString());
    console.log("startDeployerBalance --->", startDeployerBalance.toString());
    console.log("transactionResponse --->", transactionResponse);
    console.log("transactionReceipt --->", transactionReceipt);
    console.log("endFundBalance --->", endFundBalance.toString());
    console.log("endDeployerBalance --->", endDeployerBalance.toString());

    assert.equal(endFundBalance, 0);
    assert.equal(
      startFundBalance.add(startDeployerBalance).toString(),
      endDeployerBalance.add(gasCost).toString()
    );
  });

  it("allows as to withdraw with multiple funders", async () => {
    // Arrange section:
    const accounts = await ethers.getSigners();

    for (let i = 0; i < 6; i += 1) {
      const fundingConnectedContract = await funding.connect(accounts[i]);

      await fundingConnectedContract.fund({ value: sendValue });
    }

    // Act section:
    const startFundBalance = await funding.provider.getBalance(funding.address);

    const startDeployerBalance = await funding.provider.getBalance(deployer);

    const transactionResponse = await funding.withdraw();
    const transactionReceipt = await transactionResponse.wait(1);

    const { gasUsed, effectiveGasPrice } = transactionReceipt;
    const gasCost = gasUsed.mul(effectiveGasPrice);

    // Assert:
    const endFundBalance = await funding.provider.getBalance(funding.address);

    const endDeployerBalance = await funding.provider.getBalance(deployer);

    assert.equal(endFundBalance, 0);
    assert.equal(
      startFundBalance.add(startDeployerBalance).toString(),
      endDeployerBalance.add(gasCost).toString()
    );

    // Make sure that the funders are resetproperly
    await expect(funding.funders(0)).to.be.reverted;

    for (let i = 0; i < 6; i += 1) {
      assert.equal(await funding.addressToAmountFunded(accounts[i].address), 0);
    }
  });

  it("Only allows the owner to withdraw", async () => {
    const accounts = await ethers.getSigners();
    const fundingConnectedContract = await funding.connect(accounts[1]);

    await expect(fundingConnectedContract.withdraw()).to.be.reverted;
  });
});
