import axios from 'axios'
import CryptoJS from 'crypto-js';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {  
        const secret = localStorage.getItem("secret");
        const IP = localStorage.getItem("IP");
        console.log(IP)
        const ciphertextEMAIL = CryptoJS.AES.encrypt(email, secret).toString();
        const ciphertextPASS = CryptoJS.AES.encrypt(password, secret).toString();

        const authData = {
            "email": ciphertextEMAIL, 
            "password": ciphertextPASS,
            "IP": IP
        }

        
        
    
    let url = 'http://localhost:8888/registration'

    if(isLogin) {
        console.log("isLogin")

        url = 'http://localhost:8888/auth'
    }
    



    let body = JSON.stringify(authData);
    
    axios({
      method: 'post',
      url: url,
      data: body,
    }).then((response) => {
        console.log(response);
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('token', response.data.token)
        let expiresIn = response.data.dateOfCreation;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)  

        dispatch(authSuccess(response.data.token))
        dispatch(authLogout(response.data.dateOfCreation))
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
export function authLogout() {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, 300000)
    }
}

export function logout() {
    console.log("logout")
    localStorage.setItem('userId', null)
    localStorage.setItem('email', null)
    localStorage.setItem('token', null)
    return {
        type: AUTH_LOGOUT 
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token){
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
        }
    }
}


export function authSuccess(token) {
    console.log("authSuc")
    return {
        type: AUTH_SUCCESS,
        token
    }
}