var MetamaskSigner = require('./MetamaskSigner.js');
var EventpediaContract = require('./EventpediaContract');
var Promise = require('bluebird');
var {providers} = require('ethers');
// Use Web3 to handle account selection & transactions.
class Wallet {
  constructor() {
    let web3 = window.web3;
    if (typeof web3 !== 'undefined' && typeof web3.currentProvider !== 'undefined') {
      this.provider = web3.currentProvider;
    } else {
      throw new Error('No web3 or web3.currentProvider found. Do you have Metamask?');
    }
    this.init();
  }

  async init() {
    let wallet = await this.login()
    this.activeWallet = wallet.activeWallet;
    this.activeContract = wallet.activeContract;
  }
  
  async checkEthAccount () {
    this.networkID = await this.getNetWorkID();
    if (this.networkID.result != '3') throw new Error('Wrong network! Switch to Ropsten.');
    return this.provider.sendAsync({
      method: 'eth_accounts',
      params: []
    });
  }

  async getNetWorkID () {
    this.provider.sendAsync = Promise.promisify(this.provider.sendAsync);
    // Check network
    return this.provider.sendAsync({
      method: 'net_version',
      params: []
    });
  }

  async login () {
    let res = await this.checkEthAccount();
    let web3 = window.web3;
    return new Promise((resolve, reject) =>{
      var address = res.result[0];
      if (!address) throw new Error('MetaMask is locked! Please open MetaMask to unlock it.');
      var wallet = new MetamaskSigner(web3)
      wallet.provider = providers.getDefaultProvider('ropsten');
      var activeWallet = wallet;
      var activeContract = EventpediaContract(wallet);
      resolve({activeWallet, activeContract});  
    });
  }
}

export default Wallet