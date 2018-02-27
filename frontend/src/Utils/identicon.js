import Identicon from 'identicon.js';

function identicon(address, options = 60) {
  var identicon = new Identicon(address, options).toString();
  var icon = 'data:image/png;base64,' + identicon;
  return icon;
}

export default identicon;