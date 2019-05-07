import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const fetchQuestions = (jwt) => async (dispatch) => {
  try {
    const {token} = jwt;
    const { data } = await axios.get('/questions', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    dispatch({ type: actionTypes.QUESTIONS_FETCH_ALL, payload: data.reverse() })
  } catch (err) {
    console.log(err)
  }
}

export const createQuestion = (text, tag, jwt) => async (dispatch) => {
  try {
    const {token} = jwt;
    const { data } = await axios.post('/questions', { text, tag, token }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    dispatch({ type: actionTypes.QUESTIONS_CREATE, payload: data })
    dispatch(push('/home'))
  } catch (err) {
    console.log(err)
  }
}

export const fetchSpecificQuestions = (tag, jwt) => async (dispatch) => {
  try {
    const {token} = jwt;
    const { data } = await axios.get(`/questions/specific?tag=${tag}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    dispatch({ type: actionTypes.QUESTIONS_FETCH_SPECIFIC, payload: data.reverse() });
  } catch (err) {
    console.log(err);
  }
};
