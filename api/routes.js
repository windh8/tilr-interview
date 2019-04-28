const dotenv = require('dotenv').config();
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knex = require('knex')(require('./knexfile'))

const auth = require('./middleware/authorization')

const router = express.Router()

const saltRounds = 10;

//For getting all questions
router.post('/questions', auth, async function(req, res) {
  try {
    const questions = await knex.select().table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

//For adding more questions
router.post('/questions/new', auth, async (req, res) => {
  const { text, tag } = req.body
  try {
    const question = await knex('questions').insert({ text, tag }, '*')
    res.json(question)
  } catch (err) {
    res.status(text ? 500 : 400)
  }
})

//For querying specific questions based on tags
router.post('/questions/specific', auth, async (req, res) => {
  const { tag } = req.query;
  try {
    const questions = await knex('questions').where('tag', tag).table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

/* user_exists(...): helper function to determine if given
 *                  username is already used in Users Table (username already
 *                  taken by another registered user)*/
const user_exists = async (name) => {
  try {
    //const user = await knex.select().table('users').where({name, password});
    const user = await knex.select().table('users').where({name});
    if(user.length === 0) {
      return {
        success: false
      };
    }
    else {
      return {
        data: user[0],
        success: true
      };
    }
  } catch(err) {
    return {
      success: false,
      message: 'error returned'
    };
  }
}

//For Logining in users.
//This will check if user exists within users table in DB, if it does it will return
//a response object { success, hash, { username, password } } indicating that it found user
//in users table, the password hash of user (to indicate successful log in, currently set to default junk hash)
//and some other default info.
//To Do:  - incorporate hashing/salting
//        - give response object correct hash value of user
//        - more ...
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log(`name:${name}, pass:${password}`)
  try {
    const user = await user_exists(name);
    if(!user.success) {
      res.json( { success: user.success, error: 'Incorrect Username Entered!' } )
    }
    const correct_password = await bcrypt.compare(password, user.data.password);

    if(correct_password) {
      const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      };
      const token = await jwt.sign(payload, process.env.SECRET_KEY);
      res.json( {success: user.success,jwt: token });
    }
    else {
      res.json({ success: !user.success, error: 'Incorrect Password Entered!' });
    }
  }
  catch (err) {
    res.status(500)
  }
})

//For registering users
router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await user_exists(name);
    if(!user.success){
      //If user found in DB then hash password
      const hash = await bcrypt.hash(password, saltRounds);
      //Insert user into Users Table
      const user_add = await knex('users').insert({ name, password: hash }, '*');
    }
    // Will return true, to client, if user has been added to Users Table, false otherwise
    res.json({ created_user: !user.success })
  } catch {
    res.status(500)
  }
})

module.exports = router
