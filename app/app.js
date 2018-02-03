var MetamaskWallet = require('./MetamaskWallet');

(function(){
  MetamaskWallet.loginWeb3().then(()=>{
    console.log("contract connection and metamask connection have finished.");
  }).catch(err=>{
    console.log(err);
  });
})();