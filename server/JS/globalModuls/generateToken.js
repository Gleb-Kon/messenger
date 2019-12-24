require("pidcrypt/seedrandom")
require("pidcrypt/aes_cbc") 
const pidCrypt = require("pidcrypt")

function generateToken(email) {
    let token = '';
    let dateOfCreation = new Date();

    let aes = new pidCrypt.AES.CBC();
    let crypted = aes.encryptText(email + "token", {nBits: 256});
    let decrypted = aes.decryptText(pidCryptUtil.stripLineFeeds(crypted), email + "token" ,{nBits:256});
    console.log(crypted);
    console.log(decrypted);
    return {crypted, dateOfCreation};
}
exports.generateToken = generateToken;