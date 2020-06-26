import { CONNECT_TO_SOCKET } from './actionTypes'

import socketIOClient from "socket.io-client";
import crypto from 'crypto'


export default function connectToSocket() {
    return dispatch => {
        const socket = socketIOClient("localhost:8000");
        const data ={ 
            id: localStorage.getItem('id'),
            numberRoom: localStorage.getItem('id')
        }
        console.log("socket", socket.id)
        
        socket.on("connect", (socket) => {});
       
        
        socket.on("DH_response", dataRes => {
            console.log("qwqqqqqqqqqqqqqqqqqqqqqqq", dataRes)
            let client = crypto.createDiffieHellman(dataRes.serverPrime, dataRes.serverGenerator) 
            console.log(dataRes.serverPrime)
            console.log(dataRes.serverGenerator)
            console.log(dataRes.serverPublicKey)
            client.generateKeys()
            const buf = Buffer.from(dataRes.serverPublicKey);
            console.log(buf);
            const bufStr = dataRes.serverPublicKey

            const pubCliKey = client.getPublicKey();
            //console.log("bufStr", bufStr)
            
            let secret = client.computeSecret(buf).toString('hex')

            localStorage.setItem("secretForChat", secret) 

            console.log("secretsecretsecret", secret)
            
            let DHEndData = {
                id: data.id,
                pubCliKey: pubCliKey
            }
            socket.emit("DH_end", DHEndData);
        })
        socket.emit('join', {numberRoom: data.numberRoom});
        socket.emit("DH_begin", data);
       

        
        console.log("CONNECT SOCKET", socket)
        dispatch(connected(socket))
    }
    
}

export function connected(socket) {
    return {
        type: CONNECT_TO_SOCKET,
        socket
    }
}