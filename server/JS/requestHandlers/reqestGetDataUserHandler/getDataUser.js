const MongoClient = require("mongodb").MongoClient;
const checkToken = require("../../globalModuls/checkToken").checkToken;


const CryptoJS = require('crypto-js');
const mapIpAndSecret = require("../../globalModuls/mapIPandSecret").mapIpAndSecret



function getDataUser(response, data) {
     
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });    
        
    mongoClient.connect().then((client) => {
        const db = client.db("usersdb");
        const collection = db.collection("users");
            
        console.log("connect to mongoClient", mongoClient.isConnected())

        let check = checkToken(collection, data);
        let userObject = {};

        check.then((result) => {
            console.log("THEN1");
            collection.findOne({"email": data.email})
                .then((result) => {
                    //const ciphertextID = CryptoJS.AES.encrypt(result._id, data.secret).toString();

                    console.log("THEN2", data.secret);
                    console.log("THEN2", result._id);
                    
                    const ciphertextEMAIL = CryptoJS.AES.encrypt(result.email, data.secret).toString();
                    console.log(ciphertextEMAIL)
                    userObject = {
                        "id": result._id, 
                        "email": ciphertextEMAIL
                   }

                    console.log("RESPONSE", userObject);
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                    response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify(userObject));
                    response.end();
                
                })
            client.close();
          })
          .catch((err) => {
                console.log("CATCH (something incorrect)")
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(400, {"Content-Type": "text/plain"});
                response.write("Bad request");
                response.end();
            })
    })
}

exports.getDataUser = getDataUser;