import React          from 'react';
import classNames     from 'classnames';
import _              from 'lodash';

import MdlToolBar     from '../mdl/MdlToolBar.jsx!jsx';
import MdlPaper       from '../mdl/MdlPaper.jsx!jsx';

import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';
import QuizIntro      from '../QuizIntro/QuizIntro.jsx!jsx';
import QuizQuestions  from '../QuizQuestions/QuizQuestions.jsx!jsx';
import QuizEnd        from '../QuizEnd/QuizEnd.jsx!jsx';
import LinearProgress from 'material-ui/lib/linear-progress';
import Snackbar       from 'material-ui/lib/snackbar';
import {styles}       from './quiz.style.jsx!jsx';
import quizModel      from '../../models/quizModel.json!json';

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state ={
      slideIndex      : 0, 
      pourcentageDone : 0,
      showProgress    : false,       
      snackbarOpened  : false,
      snackbarMessage : '',
      snackbarAction  : '',
      animated          : true,
      viewEnters        : false         
    };
  }
  
  componentWillMount(){
    const rawQuizModel      = Object.assign({}, quizModel);
    const orderedQuestions  = _.sortBy(quizModel.questions, 'numero'); //sort questions by "numero" property
    const questionMaxIndex  = quizModel.questions.length;
    
    this.setState({
      questionMaxIndex      : questionMaxIndex,
      quizModel             : rawQuizModel, 
      quizOrderedQuestions  : orderedQuestions,
      snackbarAction        : `${this.context.translate.CLOSE_WORD}`,            
    });
  }
  
  componentDidMount(){
    this.setState({
      viewEnters       : true 
    });    
  }

  componentWillUnmount(){
    this.setState({
      viewEnters       : false 
    });     
  }  
  
  handleChangeIndex(index, fromIndex){ 
    this.setState({
      slideIndex      : index,
      snackbarOpened  : false,
    });    
  }
  
  handleQuizStart(quiz){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex      : parseInt(previsousIndex, 10) + 1,
      showProgress    : true,
      snackbarOpened  : false,
    }); 
  }
  
  handleQuizNextQuestion(question, questionIndex){ 
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10)) / this.state.questionMaxIndex)*100;
    let roundPercentDone      = Math.round(percentageDone);
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
    
    this.setState({
      quizOrderedQuestions  : updatedQuestionsModel,
      slideIndex            : parseInt(previsousIndex, 10) + 1,
      pourcentageDone       : percentageDone,
      snackbarOpened        : true,
      snackbarMessage       : `${this.context.translate.QUIZZ_GRATZ_PERCENT1} ${roundPercentDone}${this.context.translate.QUIZZ_GRATZ_PERCENT2}`,
    }); 
  }  
  
  handleQuizPreviousQuestion(question, questionIndex){ 
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10) - 2) / this.state.questionMaxIndex)*100;
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
        
    this.setState({
      quizOrderedQuestions  : updatedQuestionsModel,
      slideIndex            : parseInt(previsousIndex, 10) - 1,
      pourcentageDone       : percentageDone, 
      snackbarOpened        : false,      
    }); 
  } 
  
  handleQuizEndShowSummmary(question, questionIndex){
    let previsousIndex        = this.state.slideIndex;
    let percentageDone        = ((parseInt(previsousIndex, 10)) / this.state.questionMaxIndex)*100;
    let roundPercentDone      = Math.round(percentageDone);
    let updatedQuestionsModel = [].concat(this.state.quizOrderedQuestions);
    
    updatedQuestionsModel[questionIndex] = question;
        
    this.setState({
      quizOrderedQuestions  : updatedQuestionsModel,
      slideIndex            : parseInt(previsousIndex, 10) + 1,
      pourcentageDone       : percentageDone,
      showProgress          : true,
      snackbarOpened        : true,
      snackbarMessage       : `${this.context.translate.QUIZZ_GRATZ_PERCENT3}`,      
    });     
  }
  
  handleQuizFinished(){
    //here : should save quiz answers to database
    this.setState({ 
      snackbarOpened  : false      
    });     
    this.props.history.pushState(null, '/');   //job done so return home now 
  } 
    
  getSwipableViewsQuestionsTemplate(){
    const swipeableViewTemplate = this.state.quizOrderedQuestions.map((question, questionIndex)=>{
      return (
        <QuizQuestions 
          key={questionIndex}
          isDisabled={false}
          onNextQuestionClick={(question, questionIndex)=>this.handleQuizNextQuestion(question, questionIndex)}
          onPreviousQuestionClick={(question, questionIndex)=>this.handleQuizPreviousQuestion(question, questionIndex)}
          onFinishQuizClick={(question, questionIndex)=>this.handleQuizEndShowSummmary(question, questionIndex)}
          question={question}
          questionIndex={questionIndex}
          isFirstQuestion={questionIndex === 0 ? true : false}
          isLastQuestion={questionIndex === this.state.questionMaxIndex - 1 ? true : false}
          goNextBtnText={'QUIZZ_NEXT_BUTTON'}
          goPreviousBtnText={'QUIZZ_PREVIOUS_BUTTON'}
          goFinishQuizBtnText={'QUIZZ_VALID_BUTTON'}
        />           
      );
    });
    return swipeableViewTemplate;
  }
  
  getProgressTemplate(){
    let template = (
      <LinearProgress 
        style={Object.assign({}, styles.percentageBarContainer)}
        mode="determinate" 
        value={this.state.pourcentageDone} 
      />       
    );
    if(this.state.showProgress)   return template;
    if(!this.state.showProgress)  return <div></div>
  }
  
  render(){

    let quizViewClasses = classNames({
      'animatedViews'    : this.state.animated,
      'view-enter'       : this.state.viewEnters
    });    
    
    const progressTemplate       = this.getProgressTemplate(); 
    const swipeableViewTemplate  = this.getSwipableViewsQuestionsTemplate();
    const tabEndIndex            = (this.state.questionMaxIndex + 1) + '';  
        
    return (
      <section 
         key="quizView"
         className={quizViewClasses}>        
        <div className="mdl-grid" key="quizz">
          <div 
            className="mdl-cell mdl-cell--12-col" 
            style={Object.assign({}, styles.quiz)}>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                {progressTemplate}
              </div>
            </div>                       
            <SwipeableViews 
              index={parseInt(this.state.slideIndex, 10)} 
              onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)} >        
              <QuizIntro 
                key="0"
                title={this.state.quizModel.intro.title_translate_id}
                subtitle={this.state.quizModel.intro.content_1_translate_id}
                body={this.state.quizModel.intro.content_2_translate_id}
                goBtnText={this.state.quizModel.intro.go_button_text_id}
                onStartQuizClick={(quiz)=>this.handleQuizStart(quiz)}
              />
              {swipeableViewTemplate}
              <QuizEnd 
                key={tabEndIndex}
                title={this.state.quizModel.end.title_translate_id}
                questions={this.state.quizOrderedQuestions}
                prevBtnText={this.state.quizModel.end.prev_button_text}
                endBtnText={this.state.quizModel.end.end_button_text}
                onValidQuizClick={()=>this.handleQuizFinished()} 
              />
            </SwipeableViews>                              
          </div>
        </div>
        <Snackbar
          open={this.state.snackbarOpened}
          message={this.state.snackbarMessage}
          action={this.state.snackbarAction}
          autoHideDuration={1500}
        />          
      </section>
    );
  }

}


Quiz.contextTypes = {
  translate : React.PropTypes.object
};
