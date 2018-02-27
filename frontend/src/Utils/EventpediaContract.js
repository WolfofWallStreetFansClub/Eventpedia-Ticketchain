/*
 *  Provides a function to return a Contract instance with given providerOrSigner.
**/

var {Contract, providers} = require('ethers');
var eventpediaContractInfo = require('./config/Eventpedia.json');

var address = '0xA4c5a61C2d4489e7B448d2f3d3B368B1EBE69792';

var abi = eventpediaContractInfo.abi;

module.exports = function EventpediaContract(providerOrSigner) {
  return new Contract(address, abi, providerOrSigner);
}
