import React, {Component} from 'react';
import {connect} from 'react-redux';

import { NavLink } from 'react-router-dom';

import { registerUser } from '../../actions/register'


class Register extends Component {
  state = { user: '', pass: ''}

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.registerUser(this.state.user, this.state.pass);
  }

  render() {
    return(
      <div>
        <h3>tilr-interview User Registration Page</h3>
        <NavLink to='/' className='nav-link ' exact>Back to Login Page</NavLink>
        <form onSubmit={(event) => this.onFormSubmit(event) }>
          <div className='form-group'>
            <label>Please Enter a Username</label>
            <input className='form-control' type='text' placeholder='Username'
              value={this.state.user}
              onChange={(event) => this.setState({user: event.target.value})}/>
          </div>
          <div className='form-group'>
            <label>Please Enter a password</label>
            <input className='form-control' type='password'
              placeholder='Password' value={this.state.pass}
              onChange={(event) => this.setState({pass: event.target.value})}/>
          </div>
          <input className='btn btn-primary' type='submit' />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser
};

export default connect(null, mapDispatchToProps)(Register);
