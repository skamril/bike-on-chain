// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// const { txParams } = require("../utils/trnsactionHelper");
async function main() {

	// const ethParams = await txParams();

	const [deployer, user] = await ethers.getSigners();
  
	console.log("Deploying contract with the account:", deployer.address);
  
	console.log("Account balance:", (await deployer.getBalance()).toString());
  
	const BikeOnChain = await ethers.getContractFactory("BikeOnChain");
	const instance = await BikeOnChain.deploy(
	// 	{
	//   gasPrice: ethParams.txGasPrice,
	//   gasLimit: ethParams.txGasLimit,
	// }
	);
  
	console.log("BikeOnChain address:", instance.address);
  
	await instance.connect(deployer).mintBike(await user.getAddress(), "il-est-beau-mon-velo","","", 1234);
  
	const tokenURI = await instance.tokenURI(1);
  
	console.log("Prime tokenURI:", tokenURI);
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });
