import React, {Component} from 'react';
import {connect} from 'react-redux'

import {sendToLoginPage} from '../../actions/authenticate'

import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  onNavClick() {
    this.props.sendToLoginPage();
  }

  render() {
    return(
      <div className='questions__sticky'>
        <h1 className='text-center'>Questions</h1>
        <ul className='nav nav-pills questions__nav'>
          <li className='nav-item'><NavLink to='/home' className='nav-link' exact>Home</NavLink></li>
          <li className='nav-item'><NavLink to='/home/create' className='nav-link'>Create</NavLink></li>
          <li className='nav-item'>
            <NavLink to='/' className='nav-link' onClick={() => this.onNavClick}>Logout</NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

const mapDispatchToProps = {
  sendToLoginPage
}

export default connect(null, mapDispatchToProps)(NavBar);
