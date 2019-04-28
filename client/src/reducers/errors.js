import actionTypes from '../actions/actionTypes'

const initialState = {
  all: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ERROR:
      return { error: action.payload.error }
    case actionTypes.AUTHENTICATE:
      return { error: '' }
    case actionTypes.LOGOUT:
      return { error: '' }
    default:
      return state
  }
}
