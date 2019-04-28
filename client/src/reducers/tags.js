import actionTypes from '../actions/actionTypes'

const initialState = {
  all: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTIONS_FETCH_ALL:
      let tags = [];
      action.payload.forEach((question) => {
        if(tags.indexOf(question.tag) === -1) {
          tags.push(question.tag)
        }
      })
      return {all: tags};
    case actionTypes.LOGOUT:
      return { all: [] }
    default:
      return state
  }
}
