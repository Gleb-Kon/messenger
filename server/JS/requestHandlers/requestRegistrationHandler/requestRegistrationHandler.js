const checkSameEmails = require("./moduls/checkSameEmails").checkSameEmails;
const MongoClient = require("mongodb").MongoClient;

const pepper = require("../../globalModuls/pepper").pepper;
const hasher = require("../../globalModuls/hasher").hasher;
const generateToken = require("../../globalModuls/generateToken").generateToken;

function registration(response, data) {
    console.log('FUNCTION registration')
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

    let accessRegistrated;
    let user = data
    user.dateJoined = new Date();
    
    mongoClient.connect().then((client) => {
        const db = client.db("usersdb");
        const collection = db.collection("users");
            
        accessRegistrated = checkSameEmails(user, collection)

        accessRegistrated.then((access) => {            
            const salt = user.email + 'yare yare';
            const password = user.password;
            const shpp = password + salt + pepper;
            
            user.password = hasher(shpp);
            user.accessToken = generateToken();
            console.log("reg safe pass", user.password);

            collection.insertOne(user).then(() => {
                console.log("reg is OK")
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
                response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("User is registrated");
                response.end();

            })
            client.close();
        }).catch(() => {
            console.log("reg is not OK")
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request");
            response.end();
        })
    })
    
}
exports.registration = registration;
