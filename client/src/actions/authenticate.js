import { push } from 'connected-react-router'
import axios from '../services/axios'
import actionTypes from './actionTypes'

export default authenticateUser = () => {
  try {
    const { data } = await axios.get('/login')
    dispatch({
      type: actionTypes.AUTHENTICATE,
      payload: data
    });
  } catch(err) {
    console.log(err)
  }
}
