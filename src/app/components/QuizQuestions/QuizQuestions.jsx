import React          from 'react';
import _              from 'lodash';

export default class QuizQuestions extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		
	}
	
  currentQuestion(){
    let questionTemplate;
    let choicesTemplate; 
    let actionTemplate;
    
    let sortedChoices = _.sortBy(this.props.question.liste_choix, 'user'); //sort choices by "choix" property : 
    
    console.info(`check list choices are sorted : `);
    console.dir(sortedChoices);
      
    choicesTemplate = sortedChoices.map((choice)=>{
      let choiceTemplate;
      if(choice.type === 'checkbox')  {
        choiceTemplate= (
          <Checkbox
            key={choice.choix} 
            name={choice.nom + '-' + choice.choix}
            value={choice.valeur_defaut}
            label={choice.nom}
            defaultChecked={choice.valeur_defaut} />
        );
      }
      if(choice.type === 'textarea')  {
        choiceTemplate= (
          <TextField
            hintText={choice.translateId}
            floatingLabelText={choice.translateId}
            multiLine={true} 
          />          
        );
      }
      return (
        {choiceTemplate}
      );
    });
    
    if(this.props.isFirstQuestion) {
      actionTemplate = (
        <div>
          <RaisedButton 
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
            label={this.props.goNextBtnText} 
            secondary={true}
            onClick={()=>this.handleGoNextQuestionClick()} 
          />                  
          <RaisedButton 
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
		return (
			<div className="row">
				<div className="col-xs-12">
          {()=>this.currentQuestion()}
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