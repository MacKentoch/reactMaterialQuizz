import React            from 'react';
import RaisedButton     from 'material-ui/lib/raised-button';
import Card             from 'material-ui/lib/card/card';
import CardActions      from 'material-ui/lib/card/card-actions';
import CardText         from 'material-ui/lib/card/card-text';
import CardTitle        from 'material-ui/lib/card/card-title';

import Toolbar          from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup     from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle     from 'material-ui/lib/toolbar/toolbar-title';

import {styles}         from './quizIntro.style';


export default class QuizIntro extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
    console.info('check QuizIntro init state');		
	}
  
  handleStartQuizClick(){
    this.props.onStartQuizClick({start : true});
  }
	
	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
          <Card style={Object.assign({}, styles.container)}>
          <Toolbar>
            <ToolbarGroup 
              key={0} 
              float="left">
              <ToolbarTitle text={this.props.title} />
            </ToolbarGroup>
          </Toolbar>
            <CardText>
              <h2>{this.props.subtitle}</h2>
              <p>{this.props.body}</p>
            </CardText>
            <CardActions>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <RaisedButton 
                    label={this.props.goBtnText} 
                    primary={true}
                    onClick={()=>this.handleStartQuizClick()} 
                   />  
                </div>
              </div>
            </CardActions>            
          </Card>
				</div>
			</div>
		);
	}
}


QuizIntro.propTypes = {
  onStartQuizClick : React.PropTypes.func.isRequired, 
	title	           : React.PropTypes.string.isRequired,
	subtitle		     : React.PropTypes.string.isRequired,
  body		         : React.PropTypes.string.isRequired,
  goBtnText        : React.PropTypes.string.isRequired
};



            // <CardTitle 
            //   secondary={true}
            //   title={this.props.title} 
            // />
            // <InkBar 
            //   primary={true}  
            // />