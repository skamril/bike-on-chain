require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PROVIDER_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    mumbai: {
      url: PROVIDER_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  gasReporter: {
    enabled: true
  }
};
