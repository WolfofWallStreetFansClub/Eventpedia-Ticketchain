var MetamaskSigner = require('./MetamaskSigner.js');
var EventpediaContract = require('./EventpediaContract');
var Promise = require('bluebird');
var {providers} = require('ethers');

// Use Web3 to handle account selection & transactions.
module.exports.loginWeb3 = function loginWeb3() {
  if (typeof web3 !== 'undefined' && typeof web3.currentProvider !== 'undefined') {
    var provider = web3.currentProvider;
    provider.sendAsync = Promise.promisify(provider.sendAsync);

    // Check network
    return provider.sendAsync({
      method: 'net_version',
      params: []
    }).then((res) => {
      var networkID = res.result;
      if (networkID != '3') throw new Error('Wrong network! Switch to Ropsten.');

      // Get current account
      return provider.sendAsync({
        method: 'eth_accounts',
        params: []
      });
    }).then((res) => {
      var address = res.result[0];
      if (!address) throw new Error('MetaMask is locked! Please open MetaMask to unlock it.');
      alert("metamask connection succeeds, your address is: "+address);
      wallet = new MetamaskSigner(web3)
      wallet.provider = providers.getDefaultProvider('ropsten');
      window.activeWallet = wallet;
      window.activeContract = EventpediaContract(wallet);
      Promise.resolve();
    });
  } else {
    throw new Error('No web3 or web3.currentProvider found. Do you have Metamask?');
  }
}