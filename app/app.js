var MetamaskWallet = require('./MetamaskWallet');

(function(){
  MetamaskWallet.loginWeb3().then(()=>{
    window.activeContract.showBalance("0xBb0B729D77C114DA61991b6b24C3CBba8Fb15C19").then(val => {
      console.log(val);
    }).catch(err => {
      console.log(err);
    })
  }).catch(err=>{
    console.log(err);
  });
})();