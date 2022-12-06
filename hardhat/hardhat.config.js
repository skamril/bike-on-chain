require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {


    solidity: "0.8.0",
    networks: {
      goerli: {
        url: "https://goerli.infura.io/v3/abe7e202a30b41d182704b636839dff3",
        accounts: "abe7e202a30b41d182704b636839dff3",
      },
    },
  
  solidity: "0.8.17",
};
