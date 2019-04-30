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
/*Example values produced by reducers
 * jwt: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1N…AwN30.UcnFYpoeOux8VJ3o4nJRdw8ChscF4D1e_ttKZEHxs44" }
 * error: { error: "User Admin1 does not exist!" }
 */
