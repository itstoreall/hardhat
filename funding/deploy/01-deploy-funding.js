// function deployFunc() {
//   console.log("Hi!!!");
// }

// module.exports.default = deployFunc;

// ---

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };

// ---

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts();
  // const chainId = network.config,chainId
};
