import createTypes from 'redux-create-action-types'

export default createTypes(
  'QUESTIONS_CREATE',
  'QUESTIONS_FETCH_ALL',
  'QUESTIONS_FETCH_SPECIFIC',
  'AUTHENTICATE',
  'REGISTER',
  'LOGOUT',
  'ANSWERS_FETCH',
  'ANSWERS_SAVE',
  'ERROR'
)
