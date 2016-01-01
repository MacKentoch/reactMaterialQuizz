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
    this.state = {
      question : {} 
    }
	}
  
  componentWillReceiveProps(newProps){
    this.setState({
      question : newProps.question
    });
  }
  
  shouldComponentUpdate(newProps, newState){
    return newProps.shouldUpdate;
  }
  
  updateQuestionState(choiceNewValue, choiceIndex){
    let questionUpdated = Object.assign({}, this.state.question);
    questionUpdated.liste_choix[choiceIndex].saisie = choiceNewValue;
    
    this.setState({
      question : questionUpdated
    });
  }

  handleCheckboxChanged(event, checked, index){
    this.updateQuestionState(checked, index);
  }
    
  handleTextAreaChanged(event, index){
    this.updateQuestionState(event.target.value, index);
  }
      
  handleGoNextQuestionClick(){
    const question      = Object.assign({}, this.state.question);
    const questionIndex = this.props.questionIndex;
    this.props.onNextQuestionClick(question, questionIndex); //updated question callbacked to parent Quiz component
  }
  
  handleGoPreviousQuestionClick(){
    const question      = Object.assign({}, this.state.question);
    const questionIndex = this.props.questionIndex;
    this.props.onPreviousQuestionClick(question, questionIndex);
  }
  
  handleGoFinishQuizClick(){
    const question      = Object.assign({}, this.state.question); 
    const questionIndex = this.props.questionIndex;
    this.props.onFinishQuizClick(question, questionIndex);
  }  
  
  renderCurrentQuestion(){
    let actionTemplate;
    const sortedChoices   = _.sortBy(this.state.question.liste_choix, 'choix'); //sort choices by "choix" property : 
    const choicesTemplate = sortedChoices.map((choice, index)=>{
      
      let choiceTemplate;
      if(choice.type === 'checkbox')  {
        choiceTemplate= (
          <Checkbox
            key={index + 'checkbox'} 
            style={Object.assign({}, styles.checkbox)}
            choiceIndex={choice.choix}
            name={choice.nom + '-' + choice.choix}
            checked={choice.saisie === true? true : false}
            disabled={this.props.isDisabled}
            onCheck={(event, checked)=>this.handleCheckboxChanged(event, checked, index)}
            label={this.context.translate[choice.translateId]}
            defaultChecked={choice.valeur_defaut} 
          />
        );
      }
      if(choice.type === 'textarea')  {
        choiceTemplate= (
          <TextField
            key={index+'textarea'}
            style={Object.assign({}, styles.textarea)}
            choiceIndex={choice.choix}
            value={choice.saisie}
            disabled={this.props.isDisabled}
            onChange={(e)=>this.handleTextAreaChanged(e, index)}
            hintText={this.context.translate[choice.translateId]}
            floatingLabelText={this.context.translate[choice.translateId]}
            multiLine={true} 
            rows={4}
          />          
        );
      }
      return (
        <div key={index}>
          {choiceTemplate}
        </div>
      );
    });
    
    if(this.props.isFirstQuestion) {
      actionTemplate = (
        <div key={'actionBtn'}>
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
        <div key={'actionBtn'}>        
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
        <div key={'actionBtn'}>                 
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
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col"></div>
            <div className="mdl-cell mdl-cell--8-col">
              {actionTemplate}
            </div>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
        </CardActions>        
      );
    }

    let questionStyle = Object.assign({}, styles.common)
    if(!this.props.isDisabled) questionStyle = Object.assign({}, questionStyle, styles.container)

    return (
      <Card style={questionStyle}>
      
        <CardText style={Object.assign({}, styles.common)}>  
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col"></div>
            <div className="mdl-cell mdl-cell--8-col">
              <h3>{this.context.translate[this.props.question.Q_translate_id]}</h3> 
            </div>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>          
        </CardText>
        
        <CardText style={Object.assign({}, styles.common)}>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col"></div>
            <div className="mdl-cell mdl-cell--8-col">
              {choicesTemplate}  
            </div>
            <div className="mdl-cell mdl-cell--2-col"></div>
          </div>
        </CardText>
        
        {questionFooter}    
      </Card>          
    );
  }
    
	render(){
    console.info(`renders now question at index : ${this.props.questionIndex}`);
    const currentQuestionTemplate = this.renderCurrentQuestion();
		return (
			<div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
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
  questionIndex           : React.PropTypes.number.isRequired,
  shouldUpdate            : React.PropTypes.bool.isRequired,
	question                : React.PropTypes.shape({
      "numero"                : React.PropTypes.number.isRequired,
      "question"              : React.PropTypes.string.isRequired,
      "Q_translate_id"        : React.PropTypes.string.isRequired,
      "liste_choix"           : React.PropTypes.arrayOf(
        React.PropTypes.shape({
          "choix"           : React.PropTypes.number.isRequired,
          "type"            : React.PropTypes.oneOf(['checkbox', 'textarea']).isRequired,
          "nom"             : React.PropTypes.string.isRequired,
          "translateId"     : React.PropTypes.string.isRequired,
          "valeur_defaut"   : React.PropTypes.any.isRequired, //can be bool or string value
          "saisie"          : React.PropTypes.any.isRequired  //can be bool or string value  
        }).isRequired).isRequired,
      "nombre_minimum_choix"  : React.PropTypes.string.isRequired,
      "nombre_maximum_choix"  : React.PropTypes.string.isRequired,
      "shouldUpdate"          : React.PropTypes.bool.isRequired    
  }).isRequired,
  isDisabled              : React.PropTypes.bool.isRequired,
  isFirstQuestion         : React.PropTypes.bool.isRequired,
  isLastQuestion          : React.PropTypes.bool.isRequired,
  goNextBtnText           : React.PropTypes.string.isRequired,
  goPreviousBtnText       : React.PropTypes.string.isRequired,
  goFinishQuizBtnText     : React.PropTypes.string.isRequired
};

QuizQuestions.defaultProps = {
  shouldUpdate : true
};

QuizQuestions.contextTypes = {
  translate   : React.PropTypes.object
}
