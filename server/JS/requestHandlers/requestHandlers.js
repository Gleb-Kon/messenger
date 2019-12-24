const MongoClient = require("mongodb").MongoClient;


function auth(response) {
    console.log('FUNCTION login')
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("login");
    response.end();
 
}
function registration(response, request ) {
    console.log('FUNCTION registration')
    //const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    // mongoClient.connect(function(err, client){
 
    //     if(err){
    //         return console.log(err);
    //     } else {
    //         console.log("connect to db: OK")
            
    //     }
    //     client.close();
    // });
    let data = '';
    request.on('data', function(chunk) {
        console.log('data ++');
        data += chunk.toString();
    });
    request.on('end', function() {
        console.log(data);
        response.write('hi');
        response.end();
    });
 
}

exports.auth = auth;
exports.registration = registration;