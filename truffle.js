// Allows us to use ES6 in our migrations and tests.
require('babel-register');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "ahead rack equal august rose slide plastic push example express advance bid";

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/p4WSs1RB5PYYLRfksiEQ"),
      network_id: 3
    }
  }
}
