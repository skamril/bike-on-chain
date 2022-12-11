async function main() {
  const BikeCollectionFactory = await ethers.getContractFactory("BikeCollectionFactory");
  // Start deployment, returning a promise that resolves to a contract object
  const factory = await BikeCollectionFactory.deploy();   
  console.log("Contract deployed to address:", factory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
