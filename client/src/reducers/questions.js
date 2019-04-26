import actionTypes from '../actions/actionTypes'

const initialState = {
  all: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTIONS_FETCH_ALL:
      return { ...state, all: action.payload }
    case actionTypes.QUESTIONS_FETCH_SPECIFIC:
      return {all: action.payload};
    default:
      return state
  }
}
