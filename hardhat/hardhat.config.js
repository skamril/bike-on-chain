require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "HTTP://127.0.0.1:8545",
      chainId: 31337
    },
    mumbai: {
      url: process.env.ALCHEMY_RPC,
      accounts: [process.env.ALCHEMY_API_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  gasReporter: {
    enabled: true
  }
};
