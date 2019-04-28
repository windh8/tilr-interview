import React from 'react'
import { Route, Switch } from 'react-router-dom'

import QuestionList from './QuestionList'
import QuestionForm from './QuestionForm'
import Login from '../Login';
import Register from '../Register'


import './style.css'

const Questions = () => (
  <div className='questions'>
    <Switch>
      <Route path='/' component={Login} exact />
      <Route path='/register' component={Register} exact />
      <Route path='/home' component={QuestionList} exact />
      <Route path='/home/create' component={QuestionForm} />
    </Switch>
  </div>
)

export default Questions
