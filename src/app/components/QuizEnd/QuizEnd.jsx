import React          from 'react';
import RaisedButton   from 'material-ui/lib/raised-button';
import Card           from 'material-ui/lib/card/card';
import CardActions    from 'material-ui/lib/card/card-actions';
import CardText       from 'material-ui/lib/card/card-text';
import CardTitle      from 'material-ui/lib/card/card-title';
import QuizQuestions  from '../QuizQuestions/QuizQuestions.jsx!jsx';
import {styles}       from './quizEnd.style.jsx!jsx';

export default class QuizEnd extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		console.info('check QuizEnd init state');
	}
  
  handleEndQuizClick(){
    return this.props.onValidQuizClick({});
  }
	
  getAllAnswersTemplate(){
    const answersSummary = this.props.questions.map((question)=>{
      
      const answers = this.props.answers.map((answer)=>{
        if(answer.questionId === question.numero) return answer;
      });
      
      return (
        <QuizQuestions 
          key={question.numero + ''}
          isDisabled={true}
          onNextQuestionClick={()=>true}
          onPreviousQuestionClick={()=>true}
          onFinishQuizClick={()=>true}
          onCheckBoxChecked={(answer)=>true}
          onTextAreaChanged={(answer)=>true}
          question={question}
          numQuestion={question.numero}
          answers={answers}
          isFirstQuestion={question.numero === 1 ? true : false}
          isLastQuestion={question.numero === this.props.questions.length ? true : false}
          goNextBtnText={'QUIZZ_NEXT_BUTTON'}
          goPreviousBtnText={'QUIZZ_PREVIOUS_BUTTON'}
          goFinishQuizBtnText={'QUIZZ_VALID_BUTTON'}
        />           
      );
    });
    return answersSummary;
  }
  
  
	render(){
    
    const answersSummary = this.getAllAnswersTemplate();
    
		return (
			<div className="row">
				<div className="col-xs-12">
          <Card style={Object.assign({}, styles.container)}>
            <CardTitle 
              secondary={true}
              title={this.context.translate[this.props.title]} 
            />
            <CardText>
              <h1>Answers Summary</h1>
              <div>
                
                {answersSummary}
              </div>
            </CardText>
            <CardActions>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <RaisedButton 
                    label={this.context.translate[this.props.endBtnText]} 
                    primary={true}
                    onClick={()=>this.handleEndQuizClick()} />  
                </div>
              </div>
            </CardActions>            
          </Card>
				</div>
			</div>
		);
	}
}

QuizEnd.contextTypes = {
  translate   : React.PropTypes.object
}


QuizEnd.propTypes = {
  onValidQuizClick : React.PropTypes.func.isRequired, 
  questions        : React.PropTypes.array.isRequired,
  answers          : React.PropTypes.array, 
	title	           : React.PropTypes.string.isRequired,
  prevBtnText      : React.PropTypes.string.isRequired,
  endBtnText       : React.PropTypes.string.isRequired,
};