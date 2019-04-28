import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Login extends Component {
  render() {
    return(
      <div>
        <h3>tilr-interview Login Page</h3>
        <form className=''>
          <div className='form-group'>
            <input className='form-control' type='text' placeholder='Username' />
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' placeholder='Password' />
          </div>
          <input className='btn btn-primary' type='submit' value='login' onClick={(event) => event.preventDefault() } />
          <NavLink to='/register' className='btn btn-primary' exact>Register</NavLink>
        </form>
        <NavLink to='/home' className='nav-link ' exact>Go to Home(Test)</NavLink>
      </div>
    );
  }
};

export default Login;
