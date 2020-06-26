import { GET_ALL_USER, GET_ALL_USER_START} from './actionTypes'
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

        let url = 'http://localhost:8888/getAllUsers'

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
            console.log("getAllUsersResponse", response.data);
            let decryptUsers = []

            response.data.forEach(element => {
                const user = {
                    "id": element._id,
                    "email": CryptoJS.AES.decrypt(element.email, secret).toString(CryptoJS.enc.Utf8)
                }
                decryptUsers.push(user)
            });

            dispatch(getSuccess(decryptUsers));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export function getSuccess(users) {
    console.log("getUsersSuccess")
    return {
        type: GET_ALL_USER,
        users
    }
}

export function getStart() {
    return {
        type: GET_ALL_USER_START,
        loading: true    
    }
}
