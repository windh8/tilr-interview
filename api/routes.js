const express = require('express')
const bcrypt = require('bcrypt');

const knex = require('knex')(require('./knexfile'))

const router = express.Router()

const saltRounds = 10;

//For getting all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await knex.select().table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
})

//For adding more questions
router.post('/questions', async (req, res) => {
  const { text, tag } = req.body
  try {
    const question = await knex('questions').insert({ text, tag }, '*')
    res.json(question)
  } catch (err) {
    res.status(text ? 500 : 400)
  }
})

//For querying specific questions based on tags
router.get('/questions/specific', async (req, res) => {
  const { tag } = req.query;
  try {
    const questions = await knex('questions').where('tag', tag).table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

//For Logining in users.
//This will check if user exists within users table in DB, if it does it will return
//a response object { success, hash, { username, password } } indicating that it found user
//in users table, the password hash of user (to indicate successful log in, currently set to default junk hash)
//and some other default info.
//To Do:  - incorporate hashing/salting
//        - give response object correct hash value of user
//        - more ...
router.get('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    let response = {
      success: 'failed'
    }

    const users = await knex.select().table('users')

    const user_exits = users.some((user) => {
      return user.name === name && user.password === password;
      });

    if(user_exits) {
      response.success = 'success',

      //example password hash to be changed later
      response.hash= 'ab23f5b123sddgged',
      response.user = { username: name, password: password }
    }
    res.json(response);
  }
  catch (err) {
    res.status(500)
  }
})

//For registering users
//issue: how TF do i do this
router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  let users;
  try {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
          console.log(err)
          users = err;
        }
        else {
          console.log(hash);
          users = knex('users').insert({ name, password: hash }, '*')
          console.log(users);
        }
      })
    }).then(() => res.json(users));

    //const users = await knex('users').insert({ name, password }, '*')
    // res.json(users)
  } catch {
    res.status(500)
  }
})
/*const createUser = async (req) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if(err) {
        console.log(err)
        users = err;
      }
      else {
        console.log(hash);
        users = knex('users').insert({ name, password: hash }, '*')
        console.log(users);
      }
    })
  })
}*/


module.exports = router
