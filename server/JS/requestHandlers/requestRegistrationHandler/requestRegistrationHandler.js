const checkSameEmails = require("./moduls/checkSameEmails").checkSameEmails;
const MongoClient = require("mongodb").MongoClient;

const pepper = require("../../globalModuls/pepper").pepper;
const hasher = require("../../globalModuls/hasher").hasher;
const generateToken = require("../../globalModuls/generateToken").generateToken;

function registration(response, data) {
    //console.log('FUNCTION registration')
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    
    let dataObj;
    let accessRegistrated;

    try {
        dataObj = JSON.parse(data);
        dataObj.dateJoined = new Date();
        //console.log("data", data)
        
    } catch (error) {
        console.log(error);
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.write("Bad request");
        response.end();
    }
    mongoClient.connect(function(err, client){
        if(err) { return console.log(err); } 
        else {

            const db = client.db("usersdb");
            const collection = db.collection("users");
            
            accessRegistrated = checkSameEmails(dataObj, collection) 
            console.log("connect", mongoClient.isConnected())

            accessRegistrated.then((access) => {
                console.log("connect", mongoClient.isConnected())
                if(access === true){
                    const salt = dataObj.email + 'yare yare';
                    const password = dataObj.password;
                    const shpp = password + salt + pepper;
                    dataObj.password = hasher(shpp);
                    dataObj.accessToken = generateToken();
                    console.log("reg safe pass", dataObj.password);

                    collection.insertOne(dataObj).then(() => {
                        console.log("reg is OK")
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                        response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                        response.writeHead(200, {"Content-Type": "text/plain"});
                        response.write("User is registrated");
                        response.end();
                        })
                } else {

                    console.log("reg is not OK")
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                    response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.write("Bad request");
                    response.end();
                }
                client.close();
                console.log("connect", mongoClient.isConnected())

            })           
        } 
    });
}
exports.registration = registration;
