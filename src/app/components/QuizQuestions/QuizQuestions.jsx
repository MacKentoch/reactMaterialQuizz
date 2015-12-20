import React          from 'react';
import _              from 'lodash';
import Card           from 'material-ui/lib/card/card';
import CardActions    from 'material-ui/lib/card/card-actions';
import CardText       from 'material-ui/lib/card/card-text';
import CardTitle      from 'material-ui/lib/card/card-title';
import TextField      from 'material-ui/lib/text-field';
import RaisedButton   from 'material-ui/lib/raised-button';
import Checkbox       from 'material-ui/lib/checkbox';
import {styles}       from './quizQuestions.style';

export default class QuizQuestions extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		console.info('check QuizQuestions init');
    this.state = {
      answer : ''
    }
	}

  handleCheckboxChanged(event, checked, index){
    console.info(`
    checkbox checked state changed
    - at index : ${index}
    - changed its value to ${checked}
    - question numero : ${this.props.question.numero}
    - event.target  :${event.target}
    `);
    
     this.props.onCheckBoxChecked({
        questionId : this.props.question.numero,
        choiceId   : index,
        newValue   : checked
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
      if(choice.type === 'checkbox')  {
        choiceTemplate= (
          <Checkbox
            key={choice.choix} 
            choiceIndex={choice.choix}
            name={choice.nom + '-' + choice.choix}
            value={choice.saisie + ''}
            onCheck={(event, checked)=>this.handleCheckboxChanged(event, checked, choice.choix)}
            label={choice.nom}
            defaultChecked={choice.valeur_defaut} 
          />
        );
      }
      if(choice.type === 'textarea')  {
        choiceTemplate= (
          <TextField
            key={choice.choix}
            choiceIndex={choice.choix}
            value={choice.saisie}
            hintText={choice.translateId}
            floatingLabelText={choice.translateId}
            multiLine={true} 
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
            label={this.props.goNextBtnText} 
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
            label={this.props.goPreviousBtnText} 
            primary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
          />
          <RaisedButton 
            key={2}
            label={this.props.goFinishQuizBtnText}
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
            label={this.props.goPreviousBtnText} 
            primary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
          />
          <RaisedButton 
            key={2}
            label={this.props.goNextBtnText} 
            primary={true}
            onClick={()=>this.handleGoNextQuestionClick()} 
          />
        </div>                            
      );
    }

    return (
      <Card style={Object.assign({}, styles.container)}>
        <CardTitle 
          title={this.props.question.Q_translate_id} 
        />
        <CardText>
          {choicesTemplate}  
        </CardText>
        <CardActions>
          <div className="row">
            <div className="col-xs-12">
              {actionTemplate}
            </div>
          </div>
        </CardActions>            
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
	question                : React.PropTypes.shape({
      "numero"                : React.PropTypes.number,
      "question"              : React.PropTypes.string,
      "Q_translate_id"        : React.PropTypes.string,
      "liste_choix"           : React.PropTypes.array,
      "nombre_minimum_choix"  : React.PropTypes.string,
      "nombre_maximum_choix"  : React.PropTypes.string    
  }).isRequired,
  isFirstQuestion         : React.PropTypes.bool.isRequired,
  isLastQuestion          : React.PropTypes.bool.isRequired,
  goNextBtnText           : React.PropTypes.string.isRequired,
  goPreviousBtnText       : React.PropTypes.string.isRequired,
  goFinishQuizBtnText     : React.PropTypes.string.isRequired
};