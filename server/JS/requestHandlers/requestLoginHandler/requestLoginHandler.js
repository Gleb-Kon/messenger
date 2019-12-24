const MongoClient = require("mongodb").MongoClient;

const generateToken = require("../../globalModuls/generateToken").generateToken;
const checkLogin = require("./moduls/checkLogin").checkLogin;

require("pidcrypt/seedrandom")
  
var pidCrypt = require("pidcrypt")
require("pidcrypt/aes_cbc")

function auth(response, data) {
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    let dataObj = JSON.parse(data);
    let accessLogin;
    
    mongoClient.connect(function(err, client){
        if(err){
            return console.log(err);
        } else {

            
            const db = client.db("usersdb");
            const collection = db.collection("users");
            
            accessLogin = checkLogin(dataObj, collection);
            accessLogin.then(access => {
                if(access === true) {
                    token = generateToken(dataObj.email);    
                    collection.findOneAndUpdate(
                        {email: dataObj.email}, 
                        {$set: {accessToken: token}})
                            .then((result) => {
                            let tokenObject = {
                                "token": result.value.accessToken.crypted,
                                "dateOfCreation": result.value.accessToken.dateOfCreation,
                                "userId": result.value._id
                            }
                
                            
                            console.log("RESPONSE", tokenObject);
                            response.setHeader('Access-Control-Allow-Origin', '*');
                            response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                            response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                            response.writeHead(200, {'Content-Type': 'application/json'});
                            response.write(JSON.stringify(tokenObject));
                            response.end();
                        })

                } 
                if(access === false) {
                    console.log("false")
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                    response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                    response.writeHead(400, {'Content-Type': 'application/json'});
                    response.write("Bad request");
                    response.end();

                }
            })
        } 
    })




    

}

exports.auth = auth;