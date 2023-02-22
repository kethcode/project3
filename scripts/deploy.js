const { ethers } = require("hardhat");
const hre = require("hardhat");

require("@nomiclabs/hardhat-etherscan");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  console.log("chainId: ", chainId);

  const [deployer] = await ethers.getSigners();

  console.log("\nDeployer address:", deployer.address);
  console.log("Deployer balance:", (await deployer.getBalance()).toString());

  const padlock_factory = await ethers.getContractFactory("padlock");
  const padlock = await padlock_factory.deploy();
  console.log("padlock address: ", padlock.address);

  //   if (chainId != 31337) {
  //     await delay(60000);

  //     await hre.run("verify:verify", {
  //       address: padlock.address,
  //     });
  //     console.log("padlock verified");
  //   }

  await lock.resetTumblers({
    gasLimit: 1000000,
  });

  console.log("tumblers reset");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
