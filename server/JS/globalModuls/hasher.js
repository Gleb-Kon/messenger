const crypto = require('crypto');
const hash = crypto.createHash('sha256');

function hasher(text) {
    var secret    = 'abcdeg'; //make this your secret!!
    var algorithm = 'sha512';   //consider using sha256
    var hash, hmac;
    
    hmac = crypto.createHmac(algorithm, secret);    
    hmac.write(text); // write in to the stream
    hmac.end();       // can't read from the stream until you call end()
    hash = hmac.read().toString('hex'); 
    return hash;
}

exports.hasher = hasher;
