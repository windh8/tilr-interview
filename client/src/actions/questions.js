import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const fetchQuestions = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/questions')
    dispatch({ type: actionTypes.QUESTIONS_FETCH_ALL, payload: data.reverse() })
  } catch (err) {
    console.log(err)
  }
}

export const createQuestion = (text, tag) => async (dispatch) => {
  try {
    const { data } = await axios.post('/questions', { text, tag })
    dispatch({ type: actionTypes.QUESTIONS_CREATE, payload: data })
    dispatch(push('/home'))
  } catch (err) {
    console.log(err)
  }
}

export const fetchSpecificQuestions = (tag) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/questions/specific?tag=${tag}`)
    //console.log(`data:${data}`);
    dispatch({ type: actionTypes.QUESTIONS_FETCH_SPECIFIC, payload: data.reverse() });
  } catch (err) {
    console.log(err);
  }
};
