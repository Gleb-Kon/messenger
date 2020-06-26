const MongoClient = require("mongodb").MongoClient;

const checkToken = require("../../globalModuls/checkToken").checkToken;
const CryptoJS = require('crypto-js');
const mapIpAndSecret = require("../../globalModuls/mapIPandSecret").mapIpAndSecret

function getAllUsers(response, data) {
     
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });    
        
    mongoClient.connect().then((client) => {
        const db = client.db("usersdb");
        const collection = db.collection("users");
            
        console.log("connect to mongoClient", mongoClient.isConnected())

        let check = checkToken(collection, data);

        let userObject = {};
        let usersArray = []

        check.then((result) => {
            console.log("THEN1");
            collection.find().toArray()
                .then((result) => {
                    console.log("THEN2", data.secret);
                    result.forEach(element => {
                        const userObject = {
                            "_id": element._id,//CryptoJS.AES.encrypt(element._id, data.secret).toString(),
                            "email": CryptoJS.AES.encrypt(element.email, data.secret).toString()
                        }
                        usersArray.push(userObject)
                        console.log("userObject", userObject)
                    });
                    

                    console.log("RESPONSE", usersArray);
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                    response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify(usersArray));
                    response.end();
                
                })
            client.close();
           }).catch((err) => {
                console.log("CATCH (something incorrect)", err)
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(400, {"Content-Type": "text/plain"});
                response.write("Bad request");
                response.end();
            })
    })
}

exports.getAllUsers = getAllUsers;