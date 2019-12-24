function checkSameEmails(data, collection) {       
    
    let answer = new Promise(function(resolve, reject){
        collection.findOne({"email": data.email})
            .then(user => {
                if(user === null){
                    console.log(user);
                    resolve(true)
                } else {
                    console.log(user);
                    resolve(false)
                }
            }) 
            .catch(err => console.log(err));
    })
    return answer;
    
}

exports.checkSameEmails = checkSameEmails;
