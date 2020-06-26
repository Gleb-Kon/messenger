const MongoClient = require("mongodb").MongoClient;

const generateToken = require("../../globalModuls/generateToken").generateToken;
const checkLogin = require("./moduls/checkLogin").checkLogin;

function auth(response, data) {
    console.log("FUNCTION AUTH")
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    let user = data;
    let accessLogin;
    console.log('USER', user)
    mongoClient.connect().then((client) => {
        const db = client.db("usersdb");
        const collection = db.collection("users");
        
        accessLogin = checkLogin(user, collection);
        accessLogin.then(access => {
            token = generateToken(user.email);    
            console.log("genToken", token)
            collection.findOneAndUpdate({email: user.email}, {$set: {accessToken: token}})
            .then((result) => {
                let tokenObject = {
                    "email": user.email,
                    "token": token.crypted,
                    "dateOfCreation": token.dateOfCreation,
                }
                console.log("RESPONSE", tokenObject);
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(tokenObject));
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

exports.auth = auth;