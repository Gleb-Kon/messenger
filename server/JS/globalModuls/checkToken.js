function checkToken(collection, data) {
    console.log("FUNCTION CHECK TOKEN");
    console.log(data)

    let answer = new Promise(function(resolve, reject){
        collection.findOne({"email": data.email})
            .then(user => {
                console.log('crypted', user.accessToken.crypted);
                console.log('sending', data.token);
                if(user.accessToken.crypted === data.token){
                console.log("correct")
                    resolve(true)
                } else {
                    console.log("incorrect")
                    reject(false)
                }
            }).catch(() => {reject(false)});
    })
    return answer;
}

exports.checkToken = checkToken;