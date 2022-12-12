async function main() {
  const BikeCollectionFactory = await ethers.getContractFactory("BikeCollectionFactory");
  const factory = await BikeCollectionFactory.deploy();   
  await factory.deployed();
  console.log("Contract deployed to address:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
