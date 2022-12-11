

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {



    networks: {
      hardhat:{},
      goerli: {
        url: "https://goerli.infura.io/v3/abe7e202a30b41d182704b636839dff3",
        accounts: ["4c93c0b536059cc087aafe28635c6996b203cd5ffd18a53c214c06eec69a75d1"],
      },
    },
  
  solidity: "0.8.17",
  gasReporter: {
    currency: 'CHF',
  
      gasPrice:26 
  }

};
