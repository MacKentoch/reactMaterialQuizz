import React          from 'react';
import Tabs           from 'material-ui/lib/tabs/tabs';
import Tab            from 'material-ui/lib/tabs/tab';
import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';
import QuizIntro      from '../QuizIntro/QuizIntro.jsx!';
import QuizQuestions  from '../QuizIntro/QuizIntro.jsx!';
import QuizEnd        from '../QuizEnd/QuizEnd.jsx!';
import {styles}       from './quiz.style.js';
import quizModel      from '../../models/quizModel.json!json';

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state ={
      slideIndex  : 0,
      quizModel   : quizModel
    };
    
    console.info('check Quiz init state');
    console.dir(this.state);
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
  
  render(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2" 
             style={Object.assign({}, styles.quiz)}>
          <Paper zDepth={1}>
          
            <Tabs onChange={(value, e, tab)=>this.handleChangeTabs(value, e, tab)} 
                  value={this.state.slideIndex + ''}>
              <Tab label="Introduction" 
                   value="0" />
              <Tab label="Question" 
                   value="1" />
              <Tab label="Quiz end" 
                   value="2" />
            </Tabs>
            
            <SwipeableViews index={parseInt(this.state.slideIndex, 10)} 
                            onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)}>
              
              <div className="row"
                   style={Object.assign({}, styles.slide, styles.intro)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <QuizIntro 
                    title={this.state.quizModel.intro.title_translate_id}
                    subtitle={this.state.quizModel.intro.content_1_translate_id}
                    body={this.state.quizModel.intro.content_2_translate_id}
                    goBtnText={this.state.quizModel.intro.go_button_text_id}
                    />
                </div>
              </div>
              
              <div className="row" 
                   style={Object.assign({}, styles.slide, styles.questions)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <QuizQuestions />
                </div>
              </div>
              
              <div className="row"
                   style={Object.assign({}, styles.slide, styles.end)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <QuizEnd />
                </div>
              </div>
              
            </SwipeableViews> 
          </Paper>
        </div>
      </div>
    );
  }


}