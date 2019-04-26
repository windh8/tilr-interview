const express = require('express')
const knex = require('knex')(require('./knexfile'))

const router = express.Router()

router.get('/questions', async (req, res) => {
  try {
    const questions = await knex.select().table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
})

router.post('/questions', async (req, res) => {
  const { text, tag } = req.body
  try {
    const question = await knex('questions').insert({ text, tag }, '*')
    //const tag = await knex('questions').insert({ tag }, '*')
    //console.log(tag)
    res.json(question)
  } catch (err) {
    res.status(text ? 500 : 400)
  }
})

router.get('/questions/specific', async (req, res) => {
  const { tag } = req.query;
  try {
    console.log(tag)
    //const questions = await knex.select().table('questions').where('tag', tag);
    const questions = await knex('questions').where('tag', tag).table('questions')
    res.json(questions)
  } catch (err) {
    res.status(500)
  }
});

module.exports = router
