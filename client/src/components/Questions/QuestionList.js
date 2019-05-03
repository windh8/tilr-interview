import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchQuestions, fetchSpecificQuestions } from '../../actions/questions'
import { sendToLoginPage } from '../../actions/authenticate';

import QuestionCard from './QuestionCard';
import NavBar from './NavBar';

class QuestionList extends Component {
  state={ questions: [], tags: [], answers: [] };

  componentDidMount() {
    if(!this.props.jwt.token) {
      this.props.sendToLoginPage();
    }
    else {
      this.props.fetchQuestions(this.props.jwt).then(() => {
        this.setState({ tags: this.props.tags, questions: this.props.questions });
      })
    }
  }

  /*onAnswerSubmit = (text, ans) => {
    let answers = this.state.answers;
    answers.push({text, ans})
    this.setState({ answers: answers})
  }*/

  onQuestionListSubmit = (event) => {
    event.preventDefault();
  }

  onSelectChange = (event) => {
    if(event.target.value === 'All')
    {
      this.props.fetchQuestions(this.props.jwt).then(() => {
        this.setState({ questions: this.props.questions});
      });
    }
    else {
      this.props.fetchSpecificQuestions(event.target.value, this.props.jwt).then(() => {
        this.setState({ questions: this.props.questions});
      });
    }
  }

  onSelectRender = (list) => {
    return list.map( (tag, index ) => {
        return<option key={index + 1} name={tag}>{tag}</option>;
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className='question-list'>
          <h3>Recently Added</h3>
          <form onSubmit={(event) => this.onQuestionListSubmit(event) }>
            <select name="tag-select" className="btn btn-primary form-selector"
                    onClick={(event) => this.onSelectChange(event)}>
              <option key='0' name='All'>All</option>
              { this.onSelectRender(this.props.tags) }
            </select>
            {
              this.state.questions.map( (question) => {
                return <QuestionCard question={question} key={question.question_id}/>
              })

            }
            <input type='submit' className='btn btn-success' value='submit' />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, tags, jwt }) => ({
  questions: questions.all,
  tags: tags.all,
  jwt
})

const mapDispatchToProps = {
  fetchQuestions,
  fetchSpecificQuestions,
  sendToLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
