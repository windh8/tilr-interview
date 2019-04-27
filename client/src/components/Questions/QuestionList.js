import React, { Component } from 'react';

import { connect } from 'react-redux'
import { fetchQuestions, fetchSpecificQuestions } from '../../actions/questions'

import QuestionCard from './QuestionCard';
import NavBar from './NavBar';

class QuestionList extends Component {
  state={ Questions: this.props.questions, tags: this.props.tags };

  componentDidMount() {
    this.props.fetchQuestions().then(() => {
      this.setState({ tags: this.props.tags
    });
  })
}

  onSelectChange = (event) => {
    this.setState({ Questions: this.props.questions});
    if(event.target.value === 'All')
    {
      this.props.fetchQuestions();
    }
    else {
      this.props.fetchSpecificQuestions(event.target.value);
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
          <form onSubmit={(event) => event.preventDefault() }>
            <a className='btn btn-primary' href='/home'>Refresh</a>
            <select name="tag-select" className="btn btn-primary"
                    onClick={(event) => this.onSelectChange(event)}>
              <option key='0' name='All'>All</option>
              { this.onSelectRender() }
            </select>
            {this.props.questions.map(question => (
              <QuestionCard question={question} key={question.question_id}/>
            ))}
            <input type='submit' className='btn btn-success' value='submit' />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ questions, tags }) => ({
  questions: questions.all,
  tags: questions.all.map(({tag}) => tag)
})

const mapDispatchToProps = {
  fetchQuestions,
  fetchSpecificQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
