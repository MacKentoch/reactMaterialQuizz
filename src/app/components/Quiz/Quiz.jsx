import React          from 'react';
import _              from 'lodash';
import Tabs           from 'material-ui/lib/tabs/tabs';
import Tab            from 'material-ui/lib/tabs/tab';
import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';
import QuizIntro      from '../QuizIntro/QuizIntro.jsx!jsx';
import QuizQuestions  from '../QuizQuestions/QuizQuestions.jsx!jsx';
import QuizEnd        from '../QuizEnd/QuizEnd.jsx!jsx';
import {styles}       from './quiz.style.jsx!jsx';
import quizModel      from '../../models/quizModel.json!json';

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state ={
      slideIndex  : 0, 
      answers     : []   
    };
  }
  
  componentWillMount(){
    const rawQuizModel      = Object.assign({}, quizModel);
    const orderedQuestions  = _.sortBy(quizModel.questions, 'numero'); //sort questions by "numero" property
    const questionIndex     = 0;
    const questionMaxIndex  = quizModel.questions.length;
    
    this.setState({
      questionIndex         : questionIndex, //questionIndex is base 1 whereas slideIndex is index 0 (slideIndex = 0 is not a question but introduction)
      questionMaxIndex      : questionMaxIndex, 
      quizModel             : rawQuizModel, 
      quizOrderedQuestions  : orderedQuestions     
    });
  }
  
  handleChangeTabs(value, e, tab){
   this.setState({
      slideIndex : value,
    });     
  }
  
  handleChangeIndex(index, fromIndex){ 
    this.setState({
      slideIndex : index,
    });    
  }
  
  handleQuizStart(quiz){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    }); 
  }
  
  handleQuizNextQuestion(){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    }); 
  }  
  
  handleQuizPreviousQuestion(){ 
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) - 1,
    }); 
  } 
  
  handleQuizEndShowSummmary(){
    let previsousIndex = this.state.slideIndex;
    this.setState({
      slideIndex : parseInt(previsousIndex, 10) + 1,
    });     
  }
  
  handleQuizFinished(quiz){
    this.props.history.pushState(null, '/');    
  } 
  
  
  handleCheckBoxChecked(answer){    
    const newAnswer = {
      questionId  : answer.questionId,
      choiceId    : answer.choiceId,
      value       : answer.newValue
     };
     
    let AllAnswer = [].concat(this.state.answers);
    let newAnswers;
    let found = false;    
    if(AllAnswer.length === 0){
      newAnswers = [].concat(newAnswer);
    }else{
      newAnswers = AllAnswer.map((answer)=>{
        if(answer.choiceId !== newAnswer.choiceId) return answer;
        if(answer.choiceId === newAnswer.choiceId) {
          found = true;
          return newAnswer;
        }
      });
      if(!found){
        newAnswers = newAnswers.concat(newAnswer);
      }     
    }   
    this.setState({
      answers : newAnswers
    });
  }  
  
  handleTextAreaChanged(answer){
    const newAnswer = {
      questionId  : answer.questionId,
      choiceId    : answer.choiceId,
      value       : answer.newValue
     };
     
    let AllAnswer = [].concat(this.state.answers);
    let newAnswers;
    let found = false;    
    if(AllAnswer.length === 0){
      newAnswers = [].concat(newAnswer);
    }else{
      newAnswers = AllAnswer.map((answer)=>{
        if(answer.choiceId !== newAnswer.choiceId) return answer;
        if(answer.choiceId === newAnswer.choiceId) {
          found = true;
          return newAnswer;
        }
      });
      if(!found){
        newAnswers = newAnswers.concat(newAnswer);
      }     
    }   
    
    this.setState({
      answers : newAnswers
    });    
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
      
      const answers = this.state.answers.map((answer)=>{
        if(answer.questionId === question.numero) return answer;
      });
      
      return (
        <QuizQuestions 
          key={question.numero + ''}
          isDisabled={false}
          onNextQuestionClick={()=>this.handleQuizNextQuestion()}
          onPreviousQuestionClick={()=>this.handleQuizPreviousQuestion()}
          onFinishQuizClick={()=>this.handleQuizEndShowSummmary()}
          onCheckBoxChecked={(answer)=>this.handleCheckBoxChecked(answer)}
          onTextAreaChanged={(answer)=>this.handleTextAreaChanged(answer)}
          question={question}
          numQuestion={question.numero}
          answers={answers}
          isFirstQuestion={question.numero === 1 ? true : false}
          isLastQuestion={question.numero === this.state.questionMaxIndex ? true : false}
          goNextBtnText={'QUIZZ_NEXT_BUTTON'}
          goPreviousBtnText={'QUIZZ_PREVIOUS_BUTTON'}
          goFinishQuizBtnText={'QUIZZ_VALID_BUTTON'}
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
             <QuizEnd 
              key={tabEndIndex}
              title={this.state.quizModel.end.title_translate_id}
              questions={this.state.quizOrderedQuestions}
              answers={this.state.answers}
              prevBtnText={this.state.quizModel.end.prev_button_text}
              endBtnText={this.state.quizModel.end.end_button_text}
              onValidQuizClick={(quiz)=>this.handleQuizFinished(quiz)} 
             />
            </SwipeableViews>                    
          </Paper>
        </div>
      </div>
    );
  }

}

