const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createAccountSchema } = require('./joi-authentication/validation_schema');
const db = require('./models')
const {User} = require('./models');
const { resolve } = require('path');
const CryptoJS = require("crypto-js");
const { issPasswordTrue } = require('./authentication/password');
const multer = require('multer');
const path  = require('path');
require('dotenv').config();


const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


app.post('/addUser', async (req, res) => {
    try{
        const result = await createAccountSchema.validateAsync(req.body);
        console.log(req.body);
        var currentUser = req.body;
        var  encryptedPassword = CryptoJS.AES.encrypt(currentUser.password, process.env.SECRET_KEY).toString();

        User.create({
            name: currentUser.name,
            age: currentUser.age,
            mobile: currentUser.mobile,
            email: currentUser.email,
            password: encryptedPassword, 
            active: currentUser.active,
            role: currentUser.role
        })
        .then((result) => {
            console.log(result.dataValues);
            res.send({sucess: true, message: "user added successfully"})
        })
        .catch((err) => {
            console.log(err);
            res.send({success: false, message: "This email address is already in use!"})
        })
    }catch(err) {
        console.log(err)
        res.send({success: false, message: err.details[0].message})
    }
})

app.get('/users', (req, res) => {
    User.findAll()
    .then((users) =>{
        console.log(users);
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

app.post('/signin', (req, res) => {
    User.findAll({where: {email: req.body.email}})
    .then((user) => {
        console.log(user[0].dataValues.password);
        issPasswordTrue(req.body.password, user[0].dataValues.password).then((result)=> {
            res.send({success: true, data: user[0].dataValues});
        })
        .catch((err) => {
            res.send({success: false, message: "invalid password"});
        })
    })
    .catch((err) => {
        console.log(err);
        res.send({success: false, message: "We don't have this account in our records."})
    })
})

app.get('/getUserById/:id', (req, res) => {
    User.findAll({where: {id: req.params.id}})
    .then((user) =>{
        console.log(user);
        res.send({success: true, data: {
                    name : user[0].name,
                    age: user[0].age,
                    mobile: user[0].mobile,
                    email: user[0].email,
                    role: user[0].role
        }});
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

app.post('/updateUser', (req, res) => {
    User.update({name: req.body.name, age: req.body.age, mobile: req.body.mobile, role: req.body.role}, {where: {id: req.body.id}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post('/setActive', (req, res) => {
    User.update({active: req.body.active}, {where: {id: req.body.id}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })
})


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', '/uploads'),
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

app.post('/imageupload', async (req, res) => {
    try{
        console.log("=-=-=-=--=-=-==-=-=--=")
        console.log(req.files)
        let upload = multer({storage: storage}).single('avatar');

        upload(req, res, function(err){
            if(!req.file){
                return res.send('please select and image to upload')
            }
            else if (err instanceof multer.MulterError){
                return res.send(err)
            }
            else if (err){
                return res.send(err);
            }
        })
    }catch(err){
        console.log(err)
    }
})


db.sequelize.sync().then((req) => {
    app.listen(port, () => console.log(`Admin Panel App listening on ${port}!`));
})