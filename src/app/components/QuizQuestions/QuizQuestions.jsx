import React          from 'react';
import _              from 'lodash';
import Card           from 'material-ui/lib/card/card';
import CardActions    from 'material-ui/lib/card/card-actions';
import CardText       from 'material-ui/lib/card/card-text';
import CardTitle      from 'material-ui/lib/card/card-title';
import TextField      from 'material-ui/lib/text-field';
import RaisedButton   from 'material-ui/lib/raised-button';
import Checkbox       from 'material-ui/lib/checkbox';
import {styles}       from './quizQuestions.style.jsx!jsx';

export default class QuizQuestions extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		console.info('check QuizQuestions init');
    this.state = {
      answers : [] 
    }
	}

  handleCheckboxChanged(event, checked, index){
 
    this.props.onCheckBoxChecked({
      questionId : this.props.question.numero,
      choiceId   : index,
      newValue   : checked
    });
  }
  
  handleTextAreaChanged(event, index){    
     this.props.onTextAreaChanged({
      questionId : this.props.question.numero,
      choiceId   : index,
      newValue   : event.target.value
     });    
  }
  
  
  handleGoNextQuestionClick(){
    this.props.onNextQuestionClick();
  }
  
  handleGoPreviousQuestionClick(){
    this.props.onPreviousQuestionClick();
  }
  
  handleGoFinishQuizClick(){
    this.props.onFinishQuizClick();
  }  
  

	
  renderCurrentQuestion(){

    let actionTemplate;
    
    const sortedChoices = _.sortBy(this.props.question.liste_choix, 'choix'); //sort choices by "choix" property : 
    
    const choicesTemplate = sortedChoices.map((choice)=>{
      let choiceTemplate;
      let answer;
      if(typeof this.props.answers !== 'undefined'){
        this.props.answers.forEach((_answer)=>{ 
          if(typeof _answer !== 'undefined'){      
            if(choice.choix === _answer.choiceId){
              answer = _answer;
            }
          }              
        });        
      }
      let answerValue = typeof answer !== 'undefined' ? answer.value || '' : '';
      
      if(choice.type === 'checkbox')  {
        choiceTemplate= (
          <Checkbox
            key={choice.choix} 
            style={Object.assign({}, styles.checkbox)}
            choiceIndex={choice.choix}
            name={choice.nom + '-' + choice.choix}
            checked={answerValue === true? true : false}
            disabled={this.props.isDisabled}
            onCheck={(event, checked)=>this.handleCheckboxChanged(event, checked, choice.choix)}
            label={this.context.translate[choice.translateId]}
            defaultChecked={choice.valeur_defaut} 
          />
        );
      }
      if(choice.type === 'textarea')  {
        choiceTemplate= (
          <TextField
            key={choice.choix}
            style={Object.assign({}, styles.textarea)}
            choiceIndex={choice.choix}
            value={answerValue}
            disabled={this.props.isDisabled}
            onChange={(e)=>this.handleTextAreaChanged(e, choice.choix)}
            hintText={this.context.translate[choice.translateId]}
            floatingLabelText={this.context.translate[choice.translateId]}
            multiLine={true} 
            rows={4}
          />          
        );
      }
      return (
        <div key={choice.choix}>
          {choiceTemplate}
        </div>
      );
    });
    
    if(this.props.isFirstQuestion) {
      actionTemplate = (
        <div>
          <RaisedButton 
            key={1}
            style={Object.assign({}, styles.buttonsNext)}
            label={this.context.translate[this.props.goNextBtnText]} 
            primary={true}
            onClick={()=>this.handleGoNextQuestionClick()} 
          />
        </div>         
      );
    }

    if(this.props.isLastQuestion) {
      actionTemplate = (
        <div>        
          <RaisedButton 
            key={1}
            style={Object.assign({}, styles.buttonPrevious)}
            label={this.context.translate[this.props.goPreviousBtnText]} 
            primary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
          />
          <RaisedButton 
            key={2}
            style={Object.assign({}, styles.buttonFinish)}
            label={this.context.translate[this.props.goFinishQuizBtnText]}
            primary={true}
            onClick={()=>this.handleGoFinishQuizClick()}            
          />
        </div>                   
      );
    }

    if(!this.props.isFirstQuestion && 
       !this.props.isLastQuestion) {
      actionTemplate = (
        <div>                 
          <RaisedButton
            key={1} 
            style={Object.assign({}, styles.buttonPrevious)}
            label={this.context.translate[this.props.goPreviousBtnText]} 
            primary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
          />
          <RaisedButton 
            key={2}
            style={Object.assign({}, styles.buttonsNext)}
            label={this.context.translate[this.props.goNextBtnText]} 
            primary={true}
            onClick={()=>this.handleGoNextQuestionClick()} 
          />
        </div>                            
      );
    }
    
    let questionFooter = '';
    if(!this.props.isDisabled){
      questionFooter= (
        <CardActions>
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              {actionTemplate}
            </div>
          </div>
        </CardActions>        
      );
    }


    return (
      <Card style={Object.assign({}, styles.container)}>
        <CardText> 
           <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <h3>{this.context.translate[this.props.question.Q_translate_id]}</h3> 
            </div>
          </div>          
        </CardText>
        <CardText>
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              {choicesTemplate}  
            </div>
          </div>
        </CardText>
        {questionFooter}    
      </Card>          
    );
  }
    
  
  
	render(){
    const currentQuestionTemplate = this.renderCurrentQuestion();
		return (
			<div className="row">
        <div className="col-xs-12">
          {currentQuestionTemplate}
				</div>
			</div>
		);
	}
}


QuizQuestions.propTypes = {
  onNextQuestionClick     : React.PropTypes.func.isRequired, 
  onPreviousQuestionClick : React.PropTypes.func.isRequired, 
  onFinishQuizClick       : React.PropTypes.func.isRequired,
  onCheckBoxChecked       : React.PropTypes.func,
  onTextAreaChanged       : React.PropTypes.func,
  numQuestion             : React.PropTypes.number.isRequired,
	question                : React.PropTypes.shape({
      "numero"                : React.PropTypes.number.isRequired,
      "question"              : React.PropTypes.string.isRequired,
      "Q_translate_id"        : React.PropTypes.string.isRequired,
      "liste_choix"           : React.PropTypes.array.isRequired,
      "nombre_minimum_choix"  : React.PropTypes.string.isRequired,
      "nombre_maximum_choix"  : React.PropTypes.string.isRequired    
  }).isRequired,
  answers                 : React.PropTypes.array,
  isDisabled              : React.PropTypes.bool.isRequired,
  isFirstQuestion         : React.PropTypes.bool.isRequired,
  isLastQuestion          : React.PropTypes.bool.isRequired,
  goNextBtnText           : React.PropTypes.string.isRequired,
  goPreviousBtnText       : React.PropTypes.string.isRequired,
  goFinishQuizBtnText     : React.PropTypes.string.isRequired
};


QuizQuestions.contextTypes = {
  translate   : React.PropTypes.object
}