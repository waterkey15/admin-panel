const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createAccountSchema } = require('./joi-authentication/validation_schema');
const { createUser, getUsers, authenticateUser, getUserById, updateUser, updateActivePropertyById } = require('./database/database');



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
        createUser(req.body).then((result) => {
            console.log(result);
            res.send(result)
        }).catch((err) => {
            res.send(err);
        })
    }catch(err) {
        console.log(err)
        res.send(err.details[0].message)
    }
})

app.get('/users', (req, res) => {
    getUsers().then((result) => {
        console.log(result);
        res.send({data: result})
    })
    .catch((err) => {
        console.log(err);
        res.send({success: false})
    })
})

app.post('/signin', (req, res) => {
    authenticateUser(req.body).then((result) => {
        console.log(result);
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

app.get('/getUserById/:id', (req, res) => {

    getUserById(req.params.id).then((result) => {
        console.log(result)
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post('/updateUser', (req, res) => {
    updateUser(req.body).then((result) => {
        res.send(result);
    })
    .catch((err) => {
        res.send(err);
    })
})

app.post('/setActive', (req, res) => {
    updateActivePropertyById(req.body.id, req.body.active).then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
        res.send(false);
    })
})


app.listen(port, () => console.log(`Admin Panel App listening on ${port}!`));
