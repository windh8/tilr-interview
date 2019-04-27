import React from 'react';
//import {CSSTransition} from 'react-transition-group';//new


const QuestionCard = ({ question }) => {
  //const [inProp, setInProp] = useState(false);


    const {text, tag} = question;
    return(
      <div>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title' style={{display: 'inline'}}>{text}</h5>
            <p className='card-text'>{`Tags: ${tag}`}</p>
            <div className='card-body'>
              <input className='btn btn-success' style={{ marginRight: 10 }}
                type='button' name={text} value='Yes'/>
              <input className='btn btn-danger' type='button'
                name={text} value='No' />
              <input className='btn btn-warning' style={{ marginLeft: 10 }}
                type='button' name={text} value='Skip' />
            </div>
          </div>
        </div>
      </div>
    );

}

export default QuestionCard;
