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

  createEvent(hostName, eventPrice, eventDate, eventID) {
    return this.wallet.activeContract.createEvent(
      hostName, 
      eventPrice, 
      eventDate, 
      eventID
    );
  }

  createUser(name) {
    return this.wallet.activeContract.createUser(name);
  }

  retrieveUserInfo() {
    return this.wallet.activeContract.retrieveUserInfo();
  }

  retrieveBalance(amount) {
    return this.wallet.activeContract.retrieveBalance(amount);
  }

  showBalance(user) {
    return this.wallet.activeContract.showBalance(user);
  }

  topup(amount) {
    return this.wallet.activeContract.topUp({value: ethers.utils.parseEther(amount)});
  }

  isEnrolled(eventID) {
    return this.wallet.activeContract.isEnrolled(eventID);
  }

  viewEvent(eventID) {
    return this.wallet.activeContract.viewEvent(eventID);
  }

  joinEvent(eventID) {
    return this.wallet.activeContract.joinEvent(eventID);
  }
}

export default ContractUtils;