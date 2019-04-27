import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from '../../actions/questions'

import NavBar from './NavBar';

class QuestionsForm extends Component {
  constructor() {
    super()
    this.state = { question: '', tag: '' }
  }

  submitForm(event) {
    event.preventDefault()
    this.props.createQuestion(this.state.question, this.state.tag)
  }

  render() {
    const { question, tag } = this.state

    return (
      <div>
        <NavBar />
        <form onSubmit={event => this.submitForm(event)} className='question-form'>
          <h3>Create a Question</h3>
          <input
            className='form-control'
            onChange={({ target }) => this.setState({ question: target.value })}
            placeholder='Enter your question...'
            value={question}
          />
          <input
            className='form-control'
            onChange={({ target }) => this.setState({ tag: target.value })}
            placeholder='Enter in a tag for your question'
            value={tag}
          />
          <button
            className='btn btn-primary'
            disabled={question === ''}
            type='submit'
          >
            Create
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createQuestion
}

export default connect(null, mapDispatchToProps)(QuestionsForm)
