import React          from 'react';
import _              from 'lodash';
import Tabs           from 'material-ui/lib/tabs/tabs';
import Tab            from 'material-ui/lib/tabs/tab';
import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';
import QuizIntro      from '../QuizIntro/QuizIntro.jsx!';
import QuizQuestions  from '../QuizQuestions/QuizQuestions.jsx!';
import QuizEnd        from '../QuizEnd/QuizEnd.jsx!';
import {styles}       from './quiz.style.js';
import quizModel      from '../../models/quizModel.json!json';

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    console.info('check Quiz init');  
    const orderedQuestions = _.sortBy(quizModel.questions, 'numero'); //sort questions by "numero" property
    this.state ={
      slideIndex            : 0,
      questionIndex         : 0, //questionIndex is base 1 whereas slideIndex is index 0 (slideIndex = 0 is not a question but introduction)
      questionMaxIndex      : quizModel.questions.length, 
      quizModel             : quizModel, 
      quizOrderedQuestions  : orderedQuestions, 
      answers               : []   
    };
  }
  
  handleChangeTabs(value, e, tab){
   this.setState({
      slideIndex : value,
    });     
  }
  
  handleChangeIndex(index, fromIndex){ 
    console.info('check Quiz swipeable index change');
    this.setState({
      slideIndex : index,
    });    
  }
  
  handleQuizStart(quiz){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    }, ()=>console.info(`slideIndex after increment : ${this.state.slideIndex}`)); 
  }
  
  handleQuizNextQuestion(){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    }, ()=>console.info(`slideIndex after increment : ${this.state.slideIndex}`)); 
  }  
  
  handleQuizPreviousQuestion(){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) - 1,
    }, ()=>console.info(`slideIndex after decrement : ${this.state.slideIndex}`)); 
  } 
  
  handleQuizFinished(){
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    }, ()=>console.info(`slideIndex after increment : ${this.state.slideIndex}`));    
  } 
  
  
  updateQuizOrderedQuestionsState(qestionId, ChoiceId, value){
    
  }
  
  handleCheckBoxChecked(answer){
    console.info('handleCheckBoxChecked');
    
    let previousAnswers = [].concat(this.state.answers);
    this.setState({
      answers : previousAnswers.push(answer)
    }, ()=>console.dir(this.state.answers));
    
    this.updateQuizOrderedQuestionsState(answer.questionId, answer.choiceId, answer.newValue)
  }  
  
  handleTextAreaChanged(answer){
    console.info('handleTextAreaChanged');
    console.dir(answer);
    
    let previousAnswers = [].concat(this.state.answers);
    this.setState({
      answers : previousAnswers.push(answer)
    }, ()=>console.dir(this.state.answers));    
  }  
  
  getTabQuestionsTemplate(){
    const tabsTemplate = this.state.quizOrderedQuestions.map((question)=>{
      return (
        <Tab
          key={question.numero + ''}
          label={question.Q_translate_id}     
          value={question.numero + ''}          
        />
      );
    });
    return tabsTemplate;  
  } 
  
  getSwipableViewsQuestionsTemplate(){
    const swipeableViewTemplate = this.state.quizOrderedQuestions.map((question)=>{
      return (
        <QuizQuestions 
          key={question.numero + ''}
          onNextQuestionClick={()=>this.handleQuizNextQuestion()}
          onPreviousQuestionClick={()=>this.handleQuizPreviousQuestion()}
          onFinishQuizClick={()=>this.handleQuizFinished()}
          onCheckBoxChecked={(answer)=>this.handleCheckBoxChecked(answer)}
          onTextAreaChanged={(answer)=>this.handleTextAreaChanged(answer)}
          question={question}
          isFirstQuestion={question.numero === 1 ? true : false}
          isLastQuestion={question.numero === this.state.questionMaxIndex ? true : false}
          goNextBtnText={'next'}
          goPreviousBtnText={'prev'}
          goFinishQuizBtnText={'finish'}
        />           
      );
    });
    return swipeableViewTemplate;
  }
  
  render(){
   const tabsTemplate           = this.getTabQuestionsTemplate();
   const swipeableViewTemplate  = this.getSwipableViewsQuestionsTemplate();
   const tabEndIndex            = (this.state.questionMaxIndex + 1) + '';      
    return (
      <div className="row">
        <div 
          className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2" 
          style={Object.assign({}, styles.quiz)}>
          <Paper zDepth={1}>
            <Tabs 
              onChange={(value, e, tab)=>this.handleChangeTabs(value, e, tab)} 
              style={Object.assign({}, styles.tab)}    
              value={this.state.slideIndex + ''} >
              <Tab 
                key="0"
                label="Introduction"     
                value="0" 
              />                  
              {tabsTemplate}                 
              <Tab
                key={tabEndIndex}  
                label="Quiz end" 
                value={tabEndIndex} 
               />                  
            </Tabs> 
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
             <QuizEnd key={tabEndIndex} />
            </SwipeableViews>                    
          </Paper>
        </div>
      </div>
    );
  }

}