var Promise = require('bluebird');
var utils = require('ethers-utils');

module.exports = function MetamaskSigner(web3) {
  this.getAddress = function() {
    return utils.getAddress(web3.eth.accounts[0]);
  }

  Object.defineProperty(this, 'address', {
    get: function() {
      return utils.getAddress(web3.eth.accounts[0]);
    }
  });

  this.getBalance = function() {
    return this.provider.getBalance(this.address);
  }

  this.sendTransaction = function(transaction) {
    var tx = {
      from: this.address
    };
    ['to', 'data'].forEach(function(key) {
      if (transaction[key] != null) {
        tx[key] = transaction[key];
      }
    });
    ['gasLimit', 'gasPrice', 'nonce', 'value'].forEach(function(key) {
      if (transaction[key] != null) {
        tx[key] = utils.hexlify(transaction[key]);
      }
    });
    return new Promise(function(resolve, reject) {
      var payload = {
        jsonrpc: "2.0",
        method: 'eth_sendTransaction',
        id: 1,
        params: [ tx ]
      };
      web3.currentProvider.sendAsync(payload, function(error, res) {
        if (error) {
          reject(error);
        } else {
          tx.hash = res.result;
          resolve(tx);
        }
      });
    });
  }
}
