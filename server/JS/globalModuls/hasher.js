const crypto = require('crypto');

function hasher(text) {
    let secret    = 'abcdeg'; 
    let algorithm = 'sha512';   
    let hash, hmac;
    
    hmac = crypto.createHmac(algorithm, secret);    
    hmac.write(text); 
    hmac.end();       
    hash = hmac.read().toString('hex'); 
    return hash;
}

exports.hasher = hasher;
