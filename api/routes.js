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
  try {
    const user = await user_exists(name);
    if(!user.success){
      //If user found in DB then hash password
      const hash = await bcrypt.hash(password, saltRounds);

      const users = await knex('users').insert({ name, password: hash }, '*');
      //console.log(`user: ${name} does not exist in Users Table, adding to table now`)
      res.json({ data: users, created_user: true })
    }
    else {
      //console.log(`user: ${name} already exists in Users Table`)
      res.json({ created_user: false })
    }
  } catch {
    res.status(500)
  }
})

module.exports = router
