import axios from 'axios'
import crypto from 'crypto'

import { DIFFIE_HELMAN } from './actionTypes'

export function Dh() {
    return dispatch => {
        const DHData = {
           "Dh": true,
           "Dh_time": "begin"
        }

    let url = 'http://localhost:8888/auth';
    
    let body = JSON.stringify(DHData);
    console.log(body)
    axios({
        method: 'post',
        url: url,
        data: body,
    }).then((response) => {
        let data = DHhelp(response)
        dispatch(DHSuccess(data.IP, data.prime, data.generator, data.serverPubKey, data.secret))
        console.log("DH END")
        console.log(data.IP)
        const DHDataEnd = {
            "Dh": true,
            "Dh_time": "end",
            "IP": data.IP,
            "client_public_key": data.clientPubKey
         }
        const bodyEnd = JSON.stringify(DHDataEnd);
        return axios({
            method: 'post',
            url: url,
            data: bodyEnd
        }).then((result) => {
            console.log("2")
        })
    }).catch(function (error) {
        console.log(error);
      });
    }
}

export function DHhelp(response) {
    console.log(response.data);
          const IP = response.data.IP
          console.log("IP", response.data.IP);

          const prime = JSON.parse(JSON.stringify(response.data.serverPrime), (key, value) => { 
            
            return value && value.type === 'Buffer'
                  ? Buffer.from(value.data)
                  : value;
          });
          const generator = JSON.parse(JSON.stringify(response.data.serverGenerator), (key, value) => { 
            
            return value && value.type === 'Buffer'
                  ? Buffer.from(value.data)
                  : value;
          });
          const serverPubKey = JSON.parse(JSON.stringify(response.data.serverPublicKey), (key, value) => { 
            
            return value && value.type === 'Buffer'
                  ? Buffer.from(value.data)
                  : value;
          });

          console.log("prime" ,prime.toString("hex"))
          console.log("generator", generator.toString("hex"))
          console.log("serverPubKey", serverPubKey.toString("hex"))

          let client = crypto.createDiffieHellman(prime, generator)
          client.generateKeys(); 

          const clientPubKey = client.getPublicKey();
          console.log("clientPubKey", clientPubKey.toString("hex")  )
          
          let secret = client.computeSecret(serverPubKey)
          console.log("secret", secret.toString("hex"))

          let ObjData = {
              "IP": IP,
              "prime": prime,
              "generator": generator,
              "serverPubKey": serverPubKey,
              "clientPubKey": clientPubKey,
              "secret": secret
          }
          localStorage.setItem("IP", IP)
          localStorage.setItem("secret", secret.toString("hex"))
          


          return ObjData;

}

export function DHSuccess(IP, prime, generator, serverPublicKey, secret) {
    console.log("DIFFIE_HELMAN")
    return {
        type: DIFFIE_HELMAN,
        IP,
        prime,
        generator,
        serverPublicKey,
        secret
    }
}








