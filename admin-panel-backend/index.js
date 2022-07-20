const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createAccountSchema } = require('./joi-authentication/validation_schema');
const { createUser, getUsers, authenticateUser } = require('./database/database');



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

app.listen(port, () => console.log(`Admin Panel App listening on ${port}!`));
