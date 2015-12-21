import React          from 'react';
import RaisedButton   from 'material-ui/lib/raised-button';
import Card           from 'material-ui/lib/card/card';
import CardActions    from 'material-ui/lib/card/card-actions';
import CardText       from 'material-ui/lib/card/card-text';
import CardTitle      from 'material-ui/lib/card/card-title';
import InkBar         from 'material-ui/lib/ink-bar';
import {styles}       from './quizEnd.style';

export default class QuizEnd extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		console.info('check QuizEnd init state');
	}
	
	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
          <Card style={Object.assign({}, styles.container)}>
            <CardTitle 
              secondary={true}
              title={this.props.title} 
            />
            <InkBar 
              primary={true}  
            />
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
                    onClick={()=>this.handleStartQuizClick()} />  
                </div>
              </div>
            </CardActions>            
          </Card>
				</div>
			</div>
		);
	}
}