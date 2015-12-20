import React          from 'react';
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
    this.state ={
      slideIndex    : 0,
      questionIndex : 0, //questionIndex is base 1 whereas slideIndex is index 0 (slideIndex = 0 is not a question but introduction)
      quizModel     : quizModel
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
  
  render(){
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
                label="Introduction"     
                value="0" 
              />                  
              <Tab 
                label="Question" 
                value="1" 
              />                 
              <Tab 
                label="Quiz end" 
                 value="2" 
               />                  
            </Tabs> 
            <SwipeableViews 
              index={parseInt(this.state.slideIndex, 10)} 
              onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)} >
                        
              <QuizIntro 
                title={this.state.quizModel.intro.title_translate_id}
                subtitle={this.state.quizModel.intro.content_1_translate_id}
                body={this.state.quizModel.intro.content_2_translate_id}
                goBtnText={this.state.quizModel.intro.go_button_text_id}
                onStartQuizClick={(quiz)=>this.handleQuizStart(quiz)}
              />
            
              <QuizQuestions 
                onNextQuestionClick={()=>this.handleQuizNextQuestion()}
                onPreviousQuestionClick={()=>this.handleQuizPreviousQuestion()}
                question={this.state.quizModel.questions[parseInt(this.state.slideIndex, 10)]}
                isFirstQuestion={true}
                isLastQuestion={false}
                goNextBtnText={'next'}
                goPreviousBtnText={'prev'}
              />

             <QuizEnd />
             
            </SwipeableViews>                    
          </Paper>
        </div>
      </div>
    );
  }


}