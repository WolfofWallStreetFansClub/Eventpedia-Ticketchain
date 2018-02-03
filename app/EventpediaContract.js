/*
 *  Provides a function to return a Contract instance with given providerOrSigner.
**/

var {Contract, providers} = require('ethers');
var eventpediaContractInfo = require('../config/Eventpedia.json');

var address = '0x3521C098EB839cF18cB9F377ae4BCC708e700F22';

var abi = eventpediaContractInfo.abi;

module.exports = function EventpediaContract(providerOrSigner) {
  return new Contract(address, abi, providerOrSigner);
}
