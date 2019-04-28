import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

import {authenticateUser} from '../../actions/authenticate';

class Login extends Component {
  state = { user: '', pass: ''};

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.authenticateUser(this.state.user, this.state.pass)
  }

  render() {
    return(
      <div>
        <h3>tilr-interview Login Page</h3>
        <form className='' onSubmit={(event) => this.onFormSubmit(event)}>
          <div className='form-group'>
            <input className='form-control' type='text' placeholder='Username'
              value={this.state.user} onChange={(event) => this.setState({user: event.target.value})}/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='password' placeholder='Password'
            value={this.state.pass} onChange={(event) => this.setState({pass: event.target.value})}/>
          </div>
          <input className='btn btn-primary' type='submit' value='login' />
          <NavLink to='/register' className='btn btn-primary' exact>Register</NavLink>
        </form>
      </div>
    );
  }
};

const mapDispatchToProps = {
  authenticateUser
}

const mapStateToProps = ({ jwt }) => ({
  jwt
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
