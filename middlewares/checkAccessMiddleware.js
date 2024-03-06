const config = require("../config");
const CryptoJS = require('crypto-js');

// Generate a secret key or passphrase
const secretKey = 'abc!@#$%^&*()defQWERTY';

// Encrypt the API key
function encryptApiKey(apiKey) {
  // return CryptoJS.AES.encrypt(apiKey, secretKey).toString();
  console.log(CryptoJS.AES.encrypt(apiKey, secretKey).toString());
}



// Decrypt the API key
function decryptApiKey(encryptedApiKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedApiKey, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = () => {
  return (req, res, next) => {
    const encryptedToken = req.body.key || req.query.key || req.headers.key || req.headers.authorization;

    if (encryptedToken) {
      const decryptedToken = decryptApiKey(encryptedToken);

      if (decryptedToken == config.devKey) {
        next();
      } else {
        return res
          .status(401)
          .send({ success: false, error: "Unauthorized access" });
      }
    } else {
      return res
        .status(401)
        .send({ success: false, error: "Unauthorized access" });
    }
  };
};
