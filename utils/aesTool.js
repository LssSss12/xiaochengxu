let CryptoJS = require('./aes.js');
let key = CryptoJS.enc.Utf8.parse("#*kIplDI%DCkO$Pe");

function Encrypt_cbc(data) { 
  var srcs = CryptoJS.enc.Utf8.parse(data);
  var encrypted = CryptoJS.AES.encrypt(srcs, key,
    {
      iv: CryptoJS.enc.Utf8.parse('g7uf%!@^LkczwWqQ"'),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

	module.exports = {
		Encrypt_cbc: Encrypt_cbc,

	}