const { getNamedAccounts, ethers, run, network } = require("hardhat");

const withdraw = async () => {
  const { deployer } = await getNamedAccounts();
  const funding = await ethers.getContract("Funding", deployer);

  console.log("Funding contract...");

  const txResponse = await funding.withdraw();

  await txResponse.wait(1);
  console.log("Got it back!");
};

withdraw()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(`fund ${e}`);
    process.exit(1);
  });
