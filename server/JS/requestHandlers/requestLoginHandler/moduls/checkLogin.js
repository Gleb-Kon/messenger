const pepper = require("../../../globalModuls/pepper").pepper;
const hasher = require("../../../globalModuls/hasher").hasher;


function checkLogin(data, collection) {
    let answer = new Promise(function(resolve, reject){
        console.log("qweqrew",data.email);
        const password = data.password;
        const salt = data.email + 'yare yare';
        const shpp = password + salt + pepper;
        const safePass = hasher(shpp);
        console.log("log safe pass", safePass);
        collection.findOne({"email": data.email})
            .then(user => {

                if(user === null || user.password !== safePass){
                    resolve(false);
                } 
                else {
                    console.log("LOGIN IS OK", user);

                    resolve(true);
                }
            })            
            .catch(err => console.log(err));
    });
    return answer
}

exports.checkLogin = checkLogin;