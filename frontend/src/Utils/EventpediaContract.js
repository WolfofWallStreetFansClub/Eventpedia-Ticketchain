/*
 *  Provides a function to return a Contract instance with given providerOrSigner.
**/

var {Contract, providers} = require('ethers');
var eventpediaContractInfo = require('./config/Eventpedia.json');

var address = '0x1e4e3039B8bEA2D6f4b06af8FF1724a6d76F434c';

var abi = eventpediaContractInfo.abi;

module.exports = function EventpediaContract(providerOrSigner) {
  return new Contract(address, abi, providerOrSigner);
}
