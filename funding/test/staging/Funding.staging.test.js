const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Funding", async () => {
      let deployer;
      let funding;
      const sendValue = ethers.utils.parseEther("0.05"); // 1000000000000000000 - 1 ETH

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        funding = await ethers.getContract("Funding", deployer);
      });

      it("allows people to fund and withdrow", async () => {
        await funding.fund({ value: sendValue });
        await funding.withdraw();

        const endingBalance = await funding.provider.getBalance(
          funding.address
        );

        assert.equal(endingBalance.toString(), "0");
      });
    });
