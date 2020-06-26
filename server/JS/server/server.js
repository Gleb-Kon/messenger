const http = require("http");
const url = require("url")
const setSafeConnect = require("../setSafeConnect/setSafeConnect").setSafeConnect

function start(route, handle) {
    function onRequest(request, response) {
        
        let pathName = url.parse(request.url).pathname;
        let data = '';
        
        request.on('data', function(chunk) {
            data += chunk.toString();
        });
        
        request.on('end', function() {
            setSafeConnect(route, pathName, handle, response, data)
        });
    }
   
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");

}

exports.start = start;