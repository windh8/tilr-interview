const dotenv = require('dotenv').config();
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.get('/login', async (req, res) => {
  const { name, password } = req.body;
  try {

    const user = await user_exists(name);

    const correct_password = await bcrypt.compare(password, user.data.password);

    //check if passwords match
    if(correct_password) {
      //Generate JWT Token (expires in an hour)
      const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      };
      const token = await jwt.sign(payload, process.env.SECRET_KEY);
      //res.json(token);

      //console.log(`Did user enter in correct password? ${correct_password}`);
      res.json(user);

    }
    else {
      //console.log(`Did user enter in correct password? ${correct_password}`);
      res.json({ success: false });
    }
  }
  catch (err) {
    res.status(500)
  }
})

//For registering users
router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  console.log(`${name} ${password}`)
  //test to see what we get when we get a token
  //if(req.body.token) {
  //    console.log(`I got passed a token from client: ${req.body.token}`);
  //}

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
