import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchQuestions, fetchSpecificQuestions } from '../../actions/questions'
import { sendToLoginPage } from '../../actions/authenticate';

import QuestionCard from './QuestionCard';
import NavBar from './NavBar';

class QuestionList extends Component {
  state={ Questions: this.props.questions, tags: this.props.tags, answers: [] };

  componentDidMount() {
    if(!this.props.jwt.token) {
      this.props.sendToLoginPage();
    }
    else {
      this.props.fetchQuestions(this.props.jwt).then(() => {
        this.setState({ tags: this.props.tags });
      })
    }
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  Answer= (text, ans) => {
    let answers = this.state.answers;
    answers.push({text, ans})
    this.setState({ answers: answers})
  }

  onQuestionListSubmit = (event) => {
    event.preventDefault();
  }

  onSelectChange = (event) => {
    this.setState({ Questions: this.props.questions});
    if(event.target.value === 'All')
    {
      this.props.fetchQuestions(this.props.jwt);
    }
    else {
      this.props.fetchSpecificQuestions(event.target.value, this.props.jwt);
    }
  }

  onSelectRender = () => {
    let tags_found = [];

    this.state.tags.forEach((tag) => {
      if(tags_found.indexOf(tag) === -1) {
        tags_found.push(tag)
      }
    })

    return tags_found.map( (tag, index ) => {
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
              { this.onSelectRender() }
            </select>
            {console.log(this.props.tags)/*this.props.questions.map(question => (
              <QuestionCard question={question} Answer={this.Answer} key={question.question_id}/>
            ))*/}
            <input type='submit' className='btn btn-success' value='submit' />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, tags, jwt }) => ({
  questions: questions.all,
  tags: questions.all.map(({tag}) => {
          return tag;
        }),
  jwt
})

const mapDispatchToProps = {
  fetchQuestions,
  fetchSpecificQuestions,
  sendToLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
