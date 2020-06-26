const MongoClient = require("mongodb").MongoClient;

const checkToken = require("../../globalModuls/checkToken").checkToken;

function logout(response, data) {
    console.log("FUNCTION AUTH")
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    let user = data;
    let accessLogin;
    console.log('USER', user)
    mongoClient.connect().then((client) => {
        
        const db = client.db("usersdb");
        const collection = db.collection("users");
        
        accessLogin = checkToken(collection, data);
        accessLogin.then(access => {
            collection.findOneAndUpdate({email: user.email}, {$set: {accessToken: null}})
            .then((result) => {
                console.log("RESPONSE");
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write("Logout");
                response.end();
            })

            }).catch(() => {
                console.log("false")
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.write("Bad request");
                response.end();
        })
    })
}

exports.logout = logout;