const { getNamedAccounts, ethers, run, network } = require("hardhat");

const fund = async () => {
  const { deployer } = await getNamedAccounts();
  const funding = await ethers.getContract("Funding", deployer);

  console.log("Funding contract...");

  const txResponse = await funding.fund({
    value: ethers.utils.parseEther("0.01"),
  });

  await txResponse.wait(1);
  console.log("Funded!");
};

fund()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(`fund ${e}`);
    process.exit(1);
  });
