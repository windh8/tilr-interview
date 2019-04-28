import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const authenticateUser = (name, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/login', {name, password})
    if(data.success) {
      dispatch({
        type: actionTypes.AUTHENTICATE,
        payload: data.jwt
      });
      //dispatch another action to clear error state of app
      dispatch(push('/home'));
    }
    else {
      dispatch({
        type: actionTypes.ERROR,
        payload: data
      });
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
