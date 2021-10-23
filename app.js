const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const fs = require('fs');
const dotenv = require('dotenv')
const config = dotenv.parse(fs.readFileSync('.env')) // will return an object
const Note = require('./models/note')


// load config file to process.env
for (const [key, value] of Object.entries(config))
    process.env[key] = value
console.log(process.env)


const userRouter = require('./controller/user_controller');
// load database, connect
require('./config/database');
const jwt = require('jsonwebtoken');
const {jwt_verify} = require('./middleware/jwt_verify');


const PORT = config.PORT || 8888;
const SECRET_KEY = config.SECRET_KEY || 'test jwt secret key'


// CORS middleware
app.use(cors());
app.use('/api', jwt_verify)
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// router
app.use('/', userRouter);

app.get('/', jwt_verify, (req, res) => {
    res.send('Hello there!');
})


app.get('/info', async (req, res) => {
    const info = {name: 'yhx', age: 23};
    res.send(info);
})

app.get('/api/notes', (req, res, next) => {
    const notes = [
        {'id': 1, 'content': 'dfa', 'create_time': new Date()},
        {'id': 2, 'content': 'dfa', 'create_time': new Date()},
        {'id': 3, 'content': 'dfa', 'create_time': new Date()}
    ]
    res.json({notes, status: 200});
})


app.post('/api/note', jwt_verify, async (req, res) => {
    const node = await Note.create(req.body);
    await node.save();

    req.json({
        msg: 'success',
        status: 200
    })
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})



