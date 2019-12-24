function startSocketServer() {
    
    // function handler (request, response) {
    //     console.log("connect")
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write("status 200");
    //     response.end();
    // }

    const io = require('socket.io')();

    io.on('connection', (client) => {
      client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
    });
    
    const port = 8000;
    io.listen(port);
    console.log('listening on port ', port);

}
exports.startSocketServer = startSocketServer;