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

app.use((err, req, res, next) => {
  res.json({code: 500, msg: '', data: {}})
})

// router
app.use('/', userRouter);


app.get('/api/notes', async (req, res) => {
  const userId = req.userId;
  const notes = await Note.find({'creator': userId},
    {'__v': 0, 'creator': 0}).sort({create_time: -1});
  res.json({msg: 'success', code: 200, data: {notes}});
})


app.post('/api/note', async (req, res) => {
  const note = await Note.create({...req.body, creator: req.userId});
  for (let word of note['content'].replaceAll('\n', ' ').split(' ')) {
    if (word.startsWith('#') && word.length > 1) {
      note['tags'].push(word.substr(1))
    }
  }
  await note.save();
  res.json({
    msg: 'success',
    code: 200,
    data: note
  })
})

app.delete('/api/note/:id', async (req, res) => {
  const id = req.params.id;
  await Note.findByIdAndRemove(id);
  res.json({code: 200, msg: 'success', data: {}})
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})



