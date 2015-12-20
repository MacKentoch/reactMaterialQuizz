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
    
    console.dir(this.props);
	}
	
  currentQuestion(){
    let questionTemplate;
    let choicesTemplate; 
    let actionTemplate;
    
    let sortedChoices = _.sortBy(this.props.question.liste_choix, 'choix'); //sort choices by "choix" property : 
      
    choicesTemplate = sortedChoices.map((choice)=>{
      let choiceTemplate;
      if(choice.type === 'checkbox')  {
        choiceTemplate= (
          <Checkbox
            key={choice.choix} 
            name={choice.nom + '-' + choice.choix}
            value={choice.valeur_defaut + ''}
            label={choice.nom}
            defaultChecked={choice.valeur_defaut} />
        );
      }
      if(choice.type === 'textarea')  {
        choiceTemplate= (
          <TextField
            key={choice.choix}
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
            secondary={true}
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
            secondary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
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
            label={this.props.goNextBtnText} 
            secondary={true}
            onClick={()=>this.handleGoNextQuestionClick()} 
          />                  
          <RaisedButton
            key={2} 
            label={this.props.goPreviousBtnText} 
            secondary={true}
            onClick={()=>this.handleGoPreviousQuestionClick()} 
          />
        </div>         
      );
    }

    return (
      <Card style={Object.assign({}, styles.container)}>
        <CardTitle 
          title={this.props.question.Q_translate_id} />
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
  
  handleGoNextQuestionClick(){
    this.props.onNextQuestionClick();
  }
  
  handleGoPreviousQuestionClick(){
    this.props.onPreviousQuestionClick();
  }
  
  
	render(){
    let currentQuestionTemplate = this.currentQuestion();
    
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
  goPreviousBtnText       : React.PropTypes.string.isRequired
};