// var mysql = require('mysql');
// const CryptoJS = require("crypto-js");
// var CryptoAES = require('crypto-js/aes');
// var CryptoENC = require('crypto-js/enc-utf8');
// const { issPasswordTrue } = require('../authentication/password');
// require('dotenv').config();


// const configDB = new Promise((resolve, reject) => {

//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "admin",
//         database: "adminPanel"
//     });
    
//     resolve(con)

// })

// const encryptData = (data) => {

// }

// const createUser = (credentials) => {
//     return new Promise((resolve, reject) => {
//         console.log(credentials)    
//         var encryptedPassword = CryptoJS.AES.encrypt(credentials.password, process.env.SECRET_KEY).toString();
//         console.log(encryptedPassword)

//         var con = configDB.then((res) => {
//             res.query(`INSERT INTO users (name, age, mobile, email, password, active, role) VALUES ('${credentials.name}', '${credentials.age}', '${credentials.mobile}', '${credentials.email}', '${encryptedPassword}', '${credentials.active}', '${credentials.role}');`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                     if(err.code === "ER_DUP_ENTRY"){
//                         reject({success: false, message: "This email address is already in use!"})
//                     }
                    
//                 }else{
//                     resolve({sucess: true, message: "user added successfully"});
//                 }
//             })
//         })
//     })
// }

// const getUsers = () => {
//     return new Promise((resolve, reject) => {
//         var con = configDB.then((res) => {
//             res.query(`select * from users;`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                 }else{
//                     console.log(results)
//                     resolve({sucess: true, message: results});
//                 }
//             })
//         })
//     })
// }

// const authenticateUser = (credentials) => {
//     return new Promise((resolve, reject) => {
//         var con = configDB.then((res) => {
//             res.query(`select * from users where email = '${credentials.email}';`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                     reject(err.code)
//                 }else{
//                     console.log(results);
//                     issPasswordTrue(credentials.password, results[0].password).then((result) => {
//                         if(result === true){
//                             resolve({sucess: true, message: "Sign in succesful", data: {name: results[0].name, email: results[0].email, role: results[0].role, active: results[0].active}});
//                         }else{
//                             reject({sucess: false, message: "Wrong password"})
//                         }
//                     })
//                 }
//             })
//         })
//     })
// }

// const getUserById = (id) => {
//     return new Promise((resolve, reject) => {
//         var con = configDB.then((res) => {
//             res.query(`select * from users where id = '${id}';`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                     reject(err.code)
//                 }else{
//                     console.log(results[0])
//                     var sentData = {
//                         name : results[0].name,
//                         age: results[0].age,
//                         mobile: results[0].mobile,
//                         email: results[0].email,
//                         role: results[0].role
//                     }
//                     resolve({success: true, data: sentData});
//                 }
//             })
//         })
//     })
// }

// const updateUser = (information) => {
//     return new Promise((resolve, reject) => {
//         var con = configDB.then((res) => {
//             res.query(`UPDATE users set name = "${information.name}", age = '${information.age}', mobile="${information.mobile}", role = "${information.role}" where id = '${information.id}';`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                     reject(err.code)
//                 }else{
//                     console.log(results[0])
//                     resolve({success: true, message:"user has been updated"})
//                 }
//             })
//         })
//     })
// }

// const updateActivePropertyById = (id, isActive) => {
//     return new Promise((resolve, reject) => {
//         var con = configDB.then((res) => {
//             res.query(`UPDATE users set active = ${isActive} where id = '${id}';`, function(err, results){
//                 if(err){
//                     console.log(err.code);
//                     reject(err.code)
//                 }else{
//                     console.log(results[0])
//                     resolve({success: true, message:"user has been updated"})
//                 }
//             })
//         })
//     })
// }


// module.exports = {createUser, getUsers, authenticateUser, getUserById, updateUser, updateActivePropertyById} 