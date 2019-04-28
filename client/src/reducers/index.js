import { combineReducers } from 'redux'

import questions from './questions'
import tags from './tags';
import jwt from './jwt';

import { connectRouter } from 'connected-react-router'

const reducers = history => combineReducers({
  questions,
  tags,
  jwt,
  router: connectRouter(history)
})

export default reducers
