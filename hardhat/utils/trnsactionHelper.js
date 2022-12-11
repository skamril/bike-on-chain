const { calcEthereumTransactionParams } = require('@acala-network/eth-providers');

async function txParams() {
  const txFeePerGas = '179999946752';
  const storageByteDeposit = '100000000000000';
  const blockNumber = await ethers.provider.getBlockNumber();

  const ethParams = calcEthereumTransactionParams({
    gasLimit: '40000000',
    validUntil: (blockNumber + 100).toString(),
    storageLimit: '64001',
    txFeePerGas,
    storageByteDeposit
  });

  return {
    txGasPrice: ethParams.txGasPrice,
    txGasLimit: ethParams.txGasLimit
  };
}

module.exports = { txParams };