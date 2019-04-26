import { combineReducers } from 'redux'
import questions from './questions'
import tags from './tags'
import { connectRouter } from 'connected-react-router'

const reducers = history => combineReducers({
  questions,
  tags,
  router: connectRouter(history)
})

export default reducers
