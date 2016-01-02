import React            from 'react';
import MdlPaper         from '../mdl/MdlPaper.jsx!jsx';
import MdlToolBar       from '../mdl/MdlToolBar.jsx!jsx'
import RaisedButton     from 'material-ui/lib/raised-button';
import QuizQuestions    from '../QuizQuestions/QuizQuestions.jsx!jsx';
import Colors           from 'material-ui/lib/styles/colors';
import {styles}         from './quizEnd.style.jsx!jsx';

export default class QuizEnd extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
    
	}
  
  // componentWillMount(){ 
  //   let newMuiTheme = this.context.muiTheme;
  //   
  //   newMuiTheme.toolbar.backgroundColor = Colors.blue800;
  //   newMuiTheme.toolbar.titleColor      = '#fff';//'rgba(255,255,255,0.6)';
  //   newMuiTheme.zIndex.layer            = 5;
  //   newMuiTheme.zIndex.popover          = 100000;
  //   newMuiTheme.leftNav.zIndex          = 10000;
  //       
  //   this.setState({
  //     muiTheme : newMuiTheme
  //   });
  // }  
  
  getChildContext() {
    return {
      muiTheme: this.context.muiTheme
    };
  }    
  
  handlePreviousStepClick(){
    this.props.onPrevQuizClick();
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
          shouldUpdate={this.props.shouldUpdate}
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
			<section>
        
        <MdlToolBar 
          backgdColor={'#3F51B5'}
          textColor={'#fff'}>
          <span className="mdl-layout-title">
            {this.context.translate[this.props.title]}
          </span>
          <div className="mdl-layout-spacer"></div>
        </MdlToolBar>
        <MdlPaper>
                  
          <section id="quizEndSumUp">
            {answersSummary}
          </section>          
            
          <section id="quizIntroActions">
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--5-col">
                
                <RaisedButton 
                  style={Object.assign({}, styles.buttonPrevious)}
                  label={this.context.translate[this.props.prevBtnText]} 
                  primary={true}
                  onClick={()=>this.handlePreviousStepClick()} /> 
                                  
                <RaisedButton 
                  style={Object.assign({}, styles.buttonFinish)}
                  label={this.context.translate[this.props.endBtnText]} 
                  primary={true}
                  onClick={()=>this.handleEndQuizClick()} /> 
              </div>
            </div>          
          </section>

         </MdlPaper>    
			</section>
		);
	}
}


QuizEnd.propTypes = {
  onPrevQuizClick  : React.PropTypes.func.isRequired, 
  onValidQuizClick : React.PropTypes.func.isRequired, 
  questions        : React.PropTypes.array.isRequired,
  shouldUpdate     : React.PropTypes.bool.isRequired,
	title	           : React.PropTypes.string.isRequired,
  prevBtnText      : React.PropTypes.string.isRequired,
  endBtnText       : React.PropTypes.string.isRequired,
};

QuizEnd.defaultProps = {
  shouldUpdate     : true  
}

QuizEnd.contextTypes = {
  muiTheme    : React.PropTypes.object,
  translate   : React.PropTypes.object
};

QuizEnd.childContextTypes = {
  muiTheme  : React.PropTypes.object
};
