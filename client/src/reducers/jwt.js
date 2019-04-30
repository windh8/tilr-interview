import actionTypes from '../actions/actionTypes'

const initialState = {
  all: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return { token: action.payload }
    case actionTypes.LOGOUT:
      return {}
    default:
      return state
  }
}
