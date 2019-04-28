import { combineReducers } from 'redux'

import questions from './questions'
import tags from './tags';
import jwt from './jwt';
import error from './errors'
//import answers from './answers';

import { connectRouter } from 'connected-react-router'

const reducers = history => combineReducers({
  questions,
  tags,
  jwt,
  error,
  router: connectRouter(history)
})

export default reducers
