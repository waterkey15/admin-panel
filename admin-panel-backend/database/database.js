var mysql = require('mysql');
const CryptoJS = require("crypto-js");
var CryptoAES = require('crypto-js/aes');
var CryptoENC = require('crypto-js/enc-utf8');
require('dotenv').config();


const configDB = new Promise((resolve, reject) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "adminPanel"
    });
    
    resolve(con)

})

const encryptData = (data) => {

}

const createUser = (credentials) => {
    return new Promise((resolve, reject) => {
        console.log(credentials)    
        var encryptedPassword = CryptoJS.AES.encrypt(credentials.password, process.env.SECRET_KEY).toString();
        console.log(encryptedPassword)

        var con = configDB.then((res) => {
            res.query(`INSERT INTO users (name, age, mobile, email, password) VALUES ('${credentials.name}', '${credentials.age}', '${credentials.mobile}', '${credentials.email}', '${encryptedPassword}');`, function(err, results){
                if(err){
                    console.log(err);
                }else{
                    resolve(results);
                }
            })
        })
    })
}

module.exports = {createUser} 