import axios from 'axios'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password
        }
    
    let url = 'http://localhost:8888/registration'

    if(isLogin) {
        url = 'http://localhost:8888/auth'
    }
    const res = '';
    let body = JSON.stringify(authData);
    axios({
      method: 'post',
      url: 'http://localhost:8888/registration',
      data: body,
    }).then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}