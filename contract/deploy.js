var {Contract} = require('ethers-contracts');
var {getDefaultProvider} = require('ethers-providers');
var {Wallet} = require('ethers-wallet');

var eventpediaContractInfo = require('../config/Eventpedia.json');

var deployTransaction = Contract.getDeployTransaction(
  eventpediaContractInfo.bytecode.object,
  eventpediaContractInfo.abi
);
deployTransaction.gasLimit = 4000000;
deployTransaction.gasPrice = 40;

var provider = getDefaultProvider('ropsten');

var privateKey = '0x428ee7a65f49efd2173c1b624e228c9bbf86a9b5c867c89bbbf1dfecf5f4298f';
var wallet = new Wallet(privateKey, provider);

var sendPromise = wallet.sendTransaction(deployTransaction);

sendPromise.then(transaction => {
  console.log(transaction);
}).catch(err => {
  console.log("Contract deploy failed with the following error:");
  console.log(err);
});
