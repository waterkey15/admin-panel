var CryptoAES = require('crypto-js/aes');
var CryptoENC = require('crypto-js/enc-utf8');

require('dotenv').config();


const issPasswordTrue = (passwordGiven, passwordDB) => {
    return new Promise((resolve, reject) => {
        console.log(passwordGiven);
        console.log(passwordDB);
        var passwordFromDatabase = CryptoAES.decrypt(passwordDB , process.env.SECRET_KEY);
        console.log(passwordFromDatabase.toString(CryptoENC));
        if(passwordGiven === passwordFromDatabase.toString(CryptoENC)){
            resolve(true);
        }else{
            reject(false);
        }
    })
}


module.exports = {issPasswordTrue} 