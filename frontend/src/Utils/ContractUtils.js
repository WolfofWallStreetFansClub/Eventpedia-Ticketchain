import Wallet from './MetamaskWallet';

class ContractUtils {
  constructor() {
    this.wallet = new Wallet();
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

  topup() {
    return this.wallet.activeContract.topUp();
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