const dotenv = require('dotenv').config();
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knex = require('knex')(require('./knexfile'))

const auth = require('./middleware/authorization')

const router = express.Router()

const saltRounds = 10;

// For getting all questions
router.get('/questions', auth, async function(req, res) {
  try {
    const questions = await knex.select().table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

/*router.get('/answers', auth, async function(req, res) {
  try {
    const answers = await knex.select().table('answers')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});*/

// For adding more questions
router.post('/questions', auth, async (req, res) => {
  const { text, tag } = req.body
  try {
    const question = await knex('questions').insert({ text, tag }, '*')
    res.json(question)
  } catch (err) {
    res.status(text ? 500 : 400)
  }
})

// For querying specific questions based on tags
router.get('/questions/specific', auth, async (req, res) => {
  const { tag } = req.query;
  try {
    const questions = await knex('questions').where('tag', tag).table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

// Determines if the specified username exists within the Users Table
const user_exists = async (name) => {
  try {
    const user = await knex.select().table('users').where({name});
    if(user.length === 0) {
      return {
        success: false,
        error: `User ${name} does not exist!`
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
      error: `An error has occured!\nError: ${err}\nPlease ensure that the DataBase is up and running!`
    };
  }
}

// For Logining in users.
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await user_exists(name);
    if(!user.success) {
      res.json( { success: false, error: user.error } )
    }
    const correct_password = await bcrypt.compare(password, user.data.password);
    if(correct_password) {
      const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      };

      let token = await jwt.sign(payload, process.env.SECRET_KEY);
      res.json( {success: true, jwt: token });
    }
    else {
      res.json({ success: false, error: 'Incorrect Password Entered!' });
    }
  }
  catch (err) {
    res.status(500)
  }
})

// For registering users
router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await user_exists(name);
    if(!user.success){
      const hash = await bcrypt.hash(password, saltRounds);
      const user_add = await knex('users').insert({ name, password: hash }, '*');
    }
    res.json({ created_user: !user.success })
  } catch {
    res.status(500)
  }
})

module.exports = router
