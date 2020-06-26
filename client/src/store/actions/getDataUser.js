import { GET_USER_DATA, GET_USER_DATA_START} from './actionTypes'
import CryptoJS from 'crypto-js';
import axios from 'axios'


export default function getDataUser() {
    return async dispatch => {  
        console.log("getDataUser")
        dispatch(getStart())
        const secret = localStorage.getItem("secret");
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        const IP = localStorage.getItem("IP");

        const ciphertextTOKEN = CryptoJS.AES.encrypt(token, secret).toString();
        const ciphertextEMAIL = CryptoJS.AES.encrypt(email, secret).toString();
        console.log(IP)

        let url = 'http://localhost:8888/getDataUser'

        const data = {
            "IP": IP,
            "email": ciphertextEMAIL,
            "token": ciphertextTOKEN 
        }
        let body = JSON.stringify(data);
        
        axios({
        method: 'post',
        url: url,
        data: body,
        }).then((response) => {
            console.log("getDataUsersResponse", response);
            const responseParse = response
            const decryptEMAIL = CryptoJS.AES.decrypt(response.data.email, secret);
            localStorage.setItem('id', responseParse.data.id) 
            dispatch(getSuccess(responseParse.data.id, decryptEMAIL.toString(CryptoJS.enc.Utf8)))

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export function getSuccess(id, email) {
    console.log("getSuccess")
    return {
        type: GET_USER_DATA,
        id,
        email
        
    }
}

export function getStart() {
    return {
        type: GET_USER_DATA_START,
        loading: true    
    }
}
