import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const authenticateUser = (name, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/login', {name, password})
    dispatch({
      type: actionTypes.AUTHENTICATE,
      payload: data.jwt
    });

    //if data returns a jwt, then push directly to /home
    if(data.success) {
      dispatch(push('/home'))
    }
  } catch(err) {
    console.log(err)
  }
}

export const sendToLoginPage = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT
  });
  dispatch(push('/'))
}
