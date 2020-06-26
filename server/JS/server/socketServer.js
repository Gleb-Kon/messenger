function startSocketServer() {
  const generatePrime = require('../setSafeConnect/moduls/generatePrime').generatePrime
  const generateRandomStr = require("../globalModuls/generateRandomStr").generateRandomStr
  const mapIPAndExemplar = require("../globalModuls/mapIPandExamplar").mapIpAndExemplar
  const mapIpAndSecret = require("../globalModuls/mapIPandSecret").mapIpAndSecret
  const CryptoJS = require('crypto-js')
  const crypto = require('crypto');
  

    const io = require('socket.io')();

    io.on('connection', function(socket){
      socket.on("DH_begin", (data) => {
        const server = crypto.createDiffieHellman(128)
        const serverPublicKey = server.generateKeys();
        console.log("SOCKET CONNECTION", serverPublicKey.toString('hex'))
        const serverPrime = server.getPrime()
        console.log(serverPrime.toString('hex'))
        const serverGenerator = server.getGenerator()

        mapIPAndExemplar.set(data.id, server);
        console.log("data.id", data.id)

        io.sockets.in(data.id).emit("DH_response", {serverPublicKey, serverPrime, serverGenerator})

      });
      socket.on("DH_end", data => {
        console.log("DH_end SOCKET CONNECTION")
        console.log(data)
       
        let DHClassExamplar = mapIPAndExemplar.get(data.id)
        secret = DHClassExamplar.computeSecret(data.pubCliKey)
        
        console.log("secret", secret.toString("hex"));

        mapIpAndSecret.set(data.id, secret.toString("hex"))
        console.log("mapIpAndSecret", mapIpAndSecret);
      })
      

      socket.on("message", (msg) => {
        console.log("Message!!!!!!!!!!!!!!!!", msg.message, msg.url);
        socket.to(msg.url).emit("new_message", msg.message)
      });
      

      socket.on('join', function (data) {
        console.log("JOIN!!!!!!!!!!!!!!!!!!!", data.numberRoom)
        socket.join(data.numberRoom); // We are using room of socket io
      });

    });
    
  //   io.to("12345").emit(new_message, (msg)=> {msg})
    
    
    
  //   io.on('disconnect', function () {
  //     console.log('A user disconnected');

  //   });
  
  
  // io.sockets.in("12345").emit("new_message", (msg) => {msg})   
  
  const port = 8000;
  io.listen(port);
  console.log('listening on port', port);

}

exports.startSocketServer = startSocketServer;