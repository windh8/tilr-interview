import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <div className='questions__sticky'>
      <h1 className='text-center'>Questions</h1>
      <ul className='nav nav-pills questions__nav'>
        <li className='nav-item'><NavLink to='/home' className='nav-link' exact>Home</NavLink></li>
        <li className='nav-item'><NavLink to='/home/create' className='nav-link'>Create</NavLink></li>
        <li className='nav-item'><NavLink to='/' className='nav-link'>Logout</NavLink></li>
      </ul>
    </div>
  );
};

export default NavBar;
