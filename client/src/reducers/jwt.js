import actionTypes from '../actions/actionTypes'

const initialState = {
  all: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return { all: action.payload }
    default:
      return state
  }
}
