const http = require("http");
const url = require("url")

//io = require('socket.io').listen()
//fs = require('fs')

function createConnection(idFirst, idSecond) {
    // function onRequest(request, response) {
    //     let pathName = url.parse(request.url).pathname;
    //     console.log("createConnection")        
    //     response.writeHead(200, {"Content-Type": "JSON"});
    //     response.write("createConnection");
    //     response.end();
    // }
    // http.createServer(onRequest).listen(idFirst);
    // console.log("Server has started.");
}

exports.createConnection = createConnection;    
