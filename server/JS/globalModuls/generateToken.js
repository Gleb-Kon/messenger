require("pidcrypt/seedrandom")
require("pidcrypt/aes_cbc") 
const generateRandomStr = require("./generateRandomStr").generateRandomStr
const pidCrypt = require("pidcrypt")

function generateToken(email) {
    let dateOfCreation = new Date();
    const randomStr = generateRandomStr(10);
    let aes = new pidCrypt.AES.CBC();
    let crypted = aes.encryptText(email + randomStr + "token", {nBits: 256});
    let decrypted = aes.decryptText(pidCryptUtil.stripLineFeeds(crypted), email + randomStr + "token" ,{nBits:256});

    console.log("token crypted", crypted);
    console.log("token decrypted", decrypted);
    
    return {crypted, dateOfCreation};
}

exports.generateToken = generateToken;