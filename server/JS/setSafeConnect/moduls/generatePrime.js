const crypto = require('crypto');

function generatePrime(prime, generator, clientKey){

    const answer = new Promise(function(resolve, reject) {
        console.log("Hello Diffie")

        const server = crypto.createDiffieHellman(128)
        const serverPublicKey = server.generateKeys();
        console.log(serverPublicKey.toString('hex'))
        const serverPrime = server.getPrime()
        console.log(serverPrime.toString('hex'))
        const serverGenerator = server.getGenerator()


        resolve({serverPublicKey, serverPrime, serverGenerator, server});
    
    })
    return answer;
}

exports.generatePrime = generatePrime;
