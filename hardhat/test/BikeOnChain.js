const { expect, use } = require("chai");
const { ContractFactory, Contract } = require("ethers");
const { ethers } = require("hardhat");

const BikeOnChainContract = require("../artifacts/contracts/BikeOnChain.sol/BikeOnChain.json");
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("BikeOnchain contract", function () {
  let BikeOnChain;
  let instance;
  let deployer;
  let user;
  let deployerAddress;
  let userAddress;
  
  beforeEach(async function () {


    [deployer, user] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    userAddress = await user.getAddress();
    BikeOnChain = new ContractFactory(
      BikeOnChainContract.abi,
      BikeOnChainContract.bytecode,
      deployer
    );
    instance = await BikeOnChain.deploy();
  });

  it("should set the correct  name", async function () {
    expect(await instance.name()).to.equal("BikeOnChain");
  });

  it("should set the correct NFT symbol", async function () {
    expect(await instance.symbol()).to.equal("BOC");
  });

  it("should assign the initial balance of the deployer", async function () {
    expect(await instance.balanceOf(deployerAddress)).to.equal(0);
  });

  it("should revert when trying to get the balance of the 0x0 address", async function () {
    await expect(instance.balanceOf(NULL_ADDRESS)).to.be.revertedWith(
      "ERC721: address zero is not a valid owner"
    );
  });

  describe("mintBike", function () {

    it("should mint token to an address", async function () {
      const initialBalance = await instance.balanceOf(userAddress);

      await instance
        .connect(deployer)
        .mintBike(
          userAddress,
          "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
          "elops",
          "decat",
          123456
        );

      const finalBalance = await instance.balanceOf(userAddress);

      expect(finalBalance.toNumber() - initialBalance.toNumber()).to.equal(1);
    });

    it("should emit Transfer event", async function () {
      await expect(
        instance
          .connect(deployer)
          .mintBike(
            userAddress,
            "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
            "elops",
            "decat",
            123456
          )
      )
        .to.emit(instance, "Transfer")
        .withArgs(NULL_ADDRESS, userAddress, 1);
    });

    it("should set the expected base URI", async function () {
      await instance
        .connect(deployer)
        .mintBike(
          userAddress,
          "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
          "elops",
          "decat",
          123456
        );

      const token = await instance.tokenURI(1);

      expect(token).to.equal(
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json"
      );
    });

    it("should set the expected URI", async function () {
      await instance
        .connect(deployer)
        .mintBike(
          userAddress,
          "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
          "elops",
          "decat",
          123456
        );

      const token = await instance.tokenURI(1);

      expect(token).to.equal(
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json"
      );
    });

    it("should allow user to own multiple tokens", async function () {
      const initialBalance = await instance.balanceOf(userAddress);

      await instance.connect(deployer).mintBike(userAddress, "", "", "", 1234);
      await instance.connect(deployer).mintBike(userAddress, "", "", "", 1234);

      const finalBalance = await instance.balanceOf(userAddress);

      expect(finalBalance.toNumber() - initialBalance.toNumber()).to.equal(2);
    });

    it("should revert when trying to get an URI of an nonexistent token", async function () {
      await expect(instance.tokenURI(42)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });
  });

  

  describe("balances and ownerships", function () {

    it("should revert when trying to get balance of 0x0 address", async function () {
      await expect(instance.balanceOf(NULL_ADDRESS)).to
              .be.revertedWith("ERC721: address zero is not a valid owner");
});

it("should revert when trying to get the owner of a nonexistent token", async function () {
      await expect(instance.ownerOf(42)).to
              .be.revertedWith("ERC721: invalid token ID");
});

it("should return the token owner", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      const owner = await instance.ownerOf(1);

      expect(owner).to.equal(userAddress);
});
               
  });

  describe("authorisedMaintenance", function () {//
    it("should grant an approval", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);
      await instance.connect(deployer).authorizeMaintenance(NULL_ADDRESS,1);

      await instance.connect(user).approve(NULL_ADDRESS, 1);

      const authorized = await instance.getApproved(1);

      expect(authorized).to.equal(true);
});

  })


  describe("approvals", function () {
    it("should grant an approval", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await instance.connect(user).approve(deployerAddress, 1);

      const authorized = await instance.getApproved(1);

      expect(authorized).to.equal(deployerAddress);
});

it("should emit Approval event when granting approval", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await expect(instance.connect(user).approve(deployerAddress, 1)).to
              .emit(instance, "Approval")
              .withArgs(userAddress, deployerAddress, 1);
});

it("should revert when trying to set token approval to self", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await expect(instance.connect(user).approve(userAddress, 1)).to
              .be.revertedWith("ERC721: approval to current owner");
});

it("should revert when trying to grant approval for a token that is someone else's", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await expect(instance.connect(deployer).approve(deployerAddress, 1)).to
              .be.revertedWith("ERC721: approve caller is not token owner or approved for all");
});

it("should revert when trying to get an approval of a nonexistent token", async function() {
      await expect(instance.getApproved(42)).to
              .be.revertedWith("ERC721: invalid token ID");
});

it("should return 0x0 address as approved for a token for which no approval is given", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      const authorized = await instance.getApproved(1);

      expect(authorized).to.equal(NULL_ADDRESS);
});

it("sets approval for all", async function () {
      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      const approved = await instance.isApprovedForAll(userAddress, deployerAddress);

      expect(approved).to.equal(true);
});

it("revokes approval for all", async function () {
      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      const initiallyApproved = await instance.isApprovedForAll(userAddress, deployerAddress);

      expect(initiallyApproved).to.equal(true);

      await instance.connect(user).setApprovalForAll(deployerAddress, false);

      const finallyApproved = await instance.isApprovedForAll(userAddress, deployerAddress);

      expect(finallyApproved).to.equal(false);
});

it("doesn't reflect operator approval in single token approval", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      const approved = await instance.getApproved(1);

      expect(approved).to.equal(NULL_ADDRESS);
});

it("should allow operator to grant allowance for a apecific token", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      await instance.connect(deployer).approve(deployerAddress, 1);

      const approved = await instance.getApproved(1);

      expect(approved).to.equal(deployerAddress);
});

it("should emit Approval event when operator grants approval", async function () {
      await instance.connect(deployer).mintBike(userAddress,
        "https://gateway.pinata.cloud/ipfs/Qmf4sMs9HDS7r6gGcduhZ1Yz14hB6v8HnArF87XvnUA2ub/bike.json",
        "elops",
        "decat",
        123456);

      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      await expect(instance.connect(deployer).approve(deployerAddress, 1)).to
              .emit(instance, "Approval").
              withArgs(userAddress, deployerAddress, 1);
});

it("should emit ApprovalForAll event when approving for all", async function () {
      await expect(instance.connect(user).setApprovalForAll(deployerAddress, true)).to
              .emit(instance, "ApprovalForAll")
              .withArgs(userAddress, deployerAddress, true);
});

it("should emit ApprovalForAll event when revoking approval for all", async function () {
      await instance.connect(user).setApprovalForAll(deployerAddress, true);

      await expect(instance.connect(user).setApprovalForAll(deployerAddress, false)).to
              .emit(instance, "ApprovalForAll")
              .withArgs(userAddress, deployerAddress, false);
});

          
  });

  describe("transfers", function () {

    it("should transfer the token", async function () {
      await instance.connect(deployer).mintBike(userAddress, "","","" , 123456);

      const initialBalance = await instance.balanceOf(deployerAddress);
      
      await instance.connect(user).transferFrom(userAddress, deployerAddress, 1);

      const finalBalance = await instance.balanceOf(deployerAddress);

      expect(finalBalance.toNumber() - initialBalance.toNumber()).to.equal(1);
});

it("should emit Transfer event", async function () {
      await instance.connect(deployer).mintBike(userAddress, "","","", 12345);

      await expect(instance.connect(user).transferFrom(userAddress, deployerAddress, 1)).to
              .emit(instance, "Transfer")
              .withArgs(userAddress, deployerAddress, 1);
});

it("should allow transfer of the tokens if the allowance is given", async function () {
      await instance.connect(deployer).mintBike(userAddress, "","","",123456);

      await instance.connect(user).approve(deployerAddress, 1);

      const initialBalance = await instance.balanceOf(deployerAddress);

      await instance.connect(deployer).transferFrom(userAddress, deployerAddress, 1);

      const finalBalance = await instance.balanceOf(deployerAddress);

      expect(finalBalance.toNumber() - initialBalance.toNumber()).to.equal(1);
});

it("should reset the allowance after the token is transferred", async function () {
      await instance.connect(deployer).mintBike(userAddress, "", "", "", 123456);
      await instance.connect(user).approve(deployerAddress, 1);

      const initialAllowance = await instance.getApproved(1);

      expect(initialAllowance).to.equal(deployerAddress);

      await instance.connect(deployer).transferFrom(userAddress, deployerAddress, 1);

      const finalAllowance = await instance.getApproved(1);

      expect(finalAllowance).to.equal(NULL_ADDRESS);
});
          
  });



});

