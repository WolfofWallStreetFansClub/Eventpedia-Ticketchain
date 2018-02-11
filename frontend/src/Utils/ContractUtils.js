import Wallet from './MetamaskWallet';
import ethers from 'ethers'

class ContractUtils {
  constructor() {
    this.wallet = new Wallet();
  }

  async init () {
    await this.wallet.init();
    return this;
  }

  createEvent(eventPrice, eventID) {
    return this.wallet.activeContract.createEvent(eventPrice, eventID);
  }

  retrieveUserInfo() {
    return this.wallet.activeContract.retrieveUserInfo();
  }

  retrieveBalance(amount) {
    return this.wallet.activeContract.retrieveBalance(amount);
  }

  topup(amount) {
    return this.wallet.activeContract.topUp({value: ethers.utils.parseEther(amount)});
  }

  changeName(name) {
    return this.wallet.activeContract.changeName(name);
  }

  isEnrolled(eventID) {
    return this.wallet.activeContract.isEnrolled(eventID);
  }

  joinEvent(eventID) {
    return this.wallet.activeContract.joinEvent(eventID);
  }

  payEvent(eventID) {
    return this.wallet.activeContract.payEvent(eventID);
  }
}

export default ContractUtils;