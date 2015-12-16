import React          from 'react';
import Tabs           from 'material-ui/lib/tabs/tabs';
import Tab            from 'material-ui/lib/tabs/tab';
import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';
import {styles}       from './quiz.style.js';


export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state ={
      slideIndex : 0
    };
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
              <Tab label="Question1" 
                   value="0" />
              <Tab label="Question2" 
                   value="1" />
              <Tab label="Question3" 
                   value="2" />
            </Tabs>
            <SwipeableViews index={parseInt(this.state.slideIndex, 10)} 
                            onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)}>
              
              <div className="row"
                   style={Object.assign({}, styles.slide, styles.slide1)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <h2 style={styles.headline}>
                    question 1 : 
                  </h2>
                  <p>note : this content is swipeable</p>
                </div>
              </div>
              
              <div className="row" 
                   style={Object.assign({}, styles.slide, styles.slide2)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <h2 style={styles.headline}>
                    question 2 : 
                  </h2>
                  <p>
                    note : this content is swipeable
                  </p>
                </div>
              </div>
              
              <div className="row"
                   style={Object.assign({}, styles.slide, styles.slide3)}>
                <div className="col-xs-10 col-xs-offset-1">
                  <h2 style={Object.assign({}, styles.headline)}>
                    question 3 : 
                  </h2>
                  <p>
                    note : this content is swipeable
                  </p>
                </div>
              </div>
              
            </SwipeableViews> 
          </Paper>
        </div>
      </div>
    );
  }


}