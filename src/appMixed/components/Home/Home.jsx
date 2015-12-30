import React            from 'react';
import Paper            from 'material-ui/lib/paper';
import Card             from 'material-ui/lib/card/card';
import CardActions      from 'material-ui/lib/card/card-actions';
import CardText         from 'material-ui/lib/card/card-text';
import CardTitle        from 'material-ui/lib/card/card-title';
import {styles}         from './home.style.jsx!jsx';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){

  }

  render(){
    console.info(`
    
    home renders now
    `);    
    return (
      <div style={{height:'100%'}}>
        <h1>{this.context.translate.HOME_TITRE_1_QUIZZ}</h1>
        <h2>{this.context.translate.HOME_TITRE_2_QUIZZ}</h2>
        <p>{this.context.translate.HOME_DETAIL_TEXT}</p>
      </div>
    );
  }


}

Home.contextTypes = {
  muiTheme  : React.PropTypes.object,
  translate : React.PropTypes.object
}
