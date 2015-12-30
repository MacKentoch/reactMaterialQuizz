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

import Colors           from 'material-ui/lib/styles/colors';
import {styles}         from './quizIntro.style.jsx!jsx';


export default class QuizIntro extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
    //console.dir(this.context); //=> context does not exist here
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
  
  handleStartQuizClick(){
    this.props.onStartQuizClick({start : true});
  }
	
	render(){
    console.info(' |_ QuizIntro renders now');
    
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
              <h2>{this.context.translate[this.props.subtitle]}</h2>
              <p>{this.context.translate[this.props.body]}</p>
            </CardText>
            <CardActions>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <RaisedButton 
                    label={this.context.translate[this.props.goBtnText]} 
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


QuizIntro.contextTypes = {
  muiTheme  : React.PropTypes.object,
  translate : React.PropTypes.object
};

QuizIntro.childContextTypes = {
  muiTheme  : React.PropTypes.object
};