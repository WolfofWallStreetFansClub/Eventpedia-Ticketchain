var MetamaskWallet = require('./MetamaskWallet');

(function(){
  MetamaskWallet.loginWeb3().then(()=>{
    console.log(window.activeContract.showBalance(window.activeWallet.address)).then((val)=> console.log(val));
  }).catch(err=>{
    console.log(err);
  });
})();