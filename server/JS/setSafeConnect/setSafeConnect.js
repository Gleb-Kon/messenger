const generatePrime = require('./moduls/generatePrime').generatePrime
const generateRandomStr = require("../globalModuls/generateRandomStr").generateRandomStr
const mapIPAndExemplar = require("../globalModuls/mapIPandExamplar").mapIpAndExemplar
const mapIpAndSecret = require("../globalModuls/mapIPandSecret").mapIpAndSecret
const CryptoJS = require('crypto-js')



function setSafeConnect(route, pathName, handle, response, data) {
    const convertedData = JSON.parse(data)
    console.log("convertedData", convertedData); 
    console.log("mapIpAndExemplar", mapIPAndExemplar)

    let IP;     

    let serverResponse = {
        "serverPublicKey": null,
        "serverGenerator": null,
        "serverPrime": null
    }

    console.log("IF 1", (convertedData.Dh && convertedData.Dh_time === "begin") || convertedData.IP === undefined || mapIPAndExemplar.has(IP))
    console.log("IF 2", mapIPAndExemplar.has(convertedData.IP) && mapIPAndExemplar.get(convertedData.IP) !== undefined && (convertedData.Dh && convertedData.Dh_time === "end"))
    console.log("IF 3", mapIpAndSecret.get(convertedData.IP) !== undefined)

    if((convertedData.Dh && convertedData.Dh_time === "begin") || 
        convertedData.IP === undefined) 
    {
        
        console.log("IF 1")
        IP = generateRandomStr(10) + '-' + generateRandomStr(10)
        while(mapIPAndExemplar.has(IP)) {
            IP = generateRandomStr(10) + '-' + generateRandomStr(10)
        }
        console.log("IP client", IP)
        serverResponse.IP = IP;
        console.log(mapIpAndSecret)

        let DHClassExamplar;

        let DH = generatePrime();
        DH.then((result) => {
            DHClassExamplar = result.server;
            
            mapIPAndExemplar.set(IP, DHClassExamplar)

            console.log("mapIpAndExemplar", mapIPAndExemplar)
            serverResponse.serverPublicKey = result.serverPublicKey
            serverResponse.serverGenerator = result.serverGenerator
            serverResponse.serverPrime = result.serverPrime

            
            console.log(mapIPAndExemplar.get(serverResponse.IP).getPrime().toString('hex'))
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(serverResponse));
            response.end();

        }).catch(err => {
            console.log("SET_SAFE_CONNECT")
            console.log(err)
        }) 

        
    }
    if(mapIpAndSecret.get(convertedData.IP) !== undefined) {
        console.log("IF 3")
        let data = {}
        for (let key in convertedData) {
            if(key !== "IP"){
                console.log("encrypt",convertedData[key])
                let bytes  = CryptoJS.AES.decrypt(convertedData[key], mapIpAndSecret.get(convertedData.IP).toString("hex"));
                let originalText = bytes.toString(CryptoJS.enc.Utf8);
                console.log("Decrypt", originalText);
                data[key] = originalText;
            }
        }

        data.secret = mapIpAndSecret.get(convertedData.IP).toString("hex")

        console.log(data.secret)
        route(pathName, handle, response, data)  

    }
    if(mapIPAndExemplar.has(convertedData.IP) 
       && mapIPAndExemplar.get(convertedData.IP) !== undefined 
       && (convertedData.Dh && convertedData.Dh_time === "end"))
    {
        console.log("IF 2")
        
        const clientPublicKey = JSON.parse(JSON.stringify(convertedData.client_public_key), (key, value) => { 
            
            return value && value.type === 'Buffer'
                  ? Buffer.from(value.data)
                  : value;
          });

        console.log("clientPublicKey", clientPublicKey);

        let DHClassExamplar = mapIPAndExemplar.get(convertedData.IP)
        secret = DHClassExamplar.computeSecret(clientPublicKey)
        
        console.log("secret", secret.toString("hex"));

        mapIpAndSecret.set(convertedData.IP, secret.toString("hex"))
        console.log("mapIpAndSecret", mapIpAndSecret);
    }
   
}

exports.setSafeConnect = setSafeConnect;


