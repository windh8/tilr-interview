import React, {Component} from 'react';
//import {CSSTransition} from 'react-transition-group';//new


class QuestionCard extends Component {
  state = { selectedAns: '' };

  componentDidUpdate() {
    //console.log(`${this.props.question.text}:${this.state.selectedAns}`)
  }

  onButtonClick = (event) => {
    event.preventDefault();
    //console.log(`${this.props.question.text}:${event.target.value}`)
    if(event.target.answer !== this.state.selectedAns) {
      //does this at same time
      this.props.Answer(this.props.question.text, this.state.selectedAns);
      this.setState({ selectedAns: event.target.value })
    }
  }

  render() {
      const {text, tag} = this.props.question;
      return(
        <div>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title' style={{display: 'inline'}}>{text}</h5>
              <p className='card-text'>{`Tags: ${tag}`}</p>
              <div className='card-body'>
                <input className='btn btn-success' style={{ marginRight: 10 }}
                  type='button' name={text} value='Yes'
                  onClick={(event) => this.onButtonClick(event)}/>
                <input className='btn btn-danger' type='button'
                  name={text} value='No'
                  onClick={(event) => this.onButtonClick(event)}/>
                <input className='btn btn-warning' style={{ marginLeft: 10 }}
                  type='button' name={text} value='Skip'
                  onClick={(event) => this.onButtonClick(event)}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default QuestionCard;
