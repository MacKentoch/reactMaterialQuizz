import React            from 'react';
import RaisedButton     from 'material-ui/lib/raised-button';
import Card             from 'material-ui/lib/card/card';
import CardActions      from 'material-ui/lib/card/card-actions';
import CardText         from 'material-ui/lib/card/card-text';
import CardTitle        from 'material-ui/lib/card/card-title';
import QuizQuestions    from '../QuizQuestions/QuizQuestions.jsx!jsx';
import Toolbar          from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup     from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle     from 'material-ui/lib/toolbar/toolbar-title';

import Colors           from 'material-ui/lib/styles/colors';
import {styles}         from './quizEnd.style.jsx!jsx';

export default class QuizEnd extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		console.info(`
    check QuizEnd init state : init twice...
    TODO : 
    - to fix (should be tab or swipeableview origin)
    - to remove when fixed
    `);
	}
  
  componentWillMount(){ 
    let newMuiTheme = this.context.muiTheme;
    
    newMuiTheme.toolbar.backgroundColor = Colors.blue800;
    newMuiTheme.toolbar.titleColor      = '#fff';//'rgba(255,255,255,0.6)';
    newMuiTheme.zIndex.layer            = 5;
    newMuiTheme.zIndex.popover          = 100000;
    newMuiTheme.leftNav.zIndex          = 10000;
        
    this.setState({
      muiTheme : newMuiTheme
    });
  }  
  
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }    
  
  handleEndQuizClick(){
    return this.props.onValidQuizClick();
  }
	
  getAllAnswersTemplate(){
    const answersSummary = this.props.questions.map((question, questionIndex)=>{
      return (
        <QuizQuestions 
          key={questionIndex}
          isDisabled={true}
          onNextQuestionClick={()=>true}
          onPreviousQuestionClick={()=>true}
          onFinishQuizClick={()=>true}
          question={question}
          questionIndex={questionIndex}
          isFirstQuestion={questionIndex === 0 ? true : false}
          isLastQuestion={questionIndex=== this.props.questions.length - 1 ? true : false}
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
            <Toolbar>
              <ToolbarGroup 
                key={0} 
                float="left">
                <ToolbarTitle 
                  text={this.context.translate[this.props.title]}
                  style={Object.assign({}, styles.title)} 
                />
              </ToolbarGroup>
            </Toolbar>    
            <CardText>
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


QuizEnd.propTypes = {
  onValidQuizClick : React.PropTypes.func.isRequired, 
  questions        : React.PropTypes.array.isRequired,
	title	           : React.PropTypes.string.isRequired,
  prevBtnText      : React.PropTypes.string.isRequired,
  endBtnText       : React.PropTypes.string.isRequired,
};


QuizEnd.contextTypes = {
  muiTheme    : React.PropTypes.object,
  translate   : React.PropTypes.object
};

QuizEnd.childContextTypes = {
  muiTheme  : React.PropTypes.object
};
