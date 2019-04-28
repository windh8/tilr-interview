import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export const registerUser = (name, pass) => async (dispatch) => {
  try {
    const { data } = await axios.post('/register', { name, password: pass })
    dispatch({ type: actionTypes.REGISTER, payload: data })
    dispatch(push('/'))
  } catch (err) {
    console.log(err)
  }
}
