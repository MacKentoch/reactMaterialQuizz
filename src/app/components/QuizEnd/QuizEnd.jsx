import React          from 'react';
import RaisedButton   from 'material-ui/lib/raised-button';
import Card           from 'material-ui/lib/card/card';
import CardActions    from 'material-ui/lib/card/card-actions';
import CardText       from 'material-ui/lib/card/card-text';
import CardTitle      from 'material-ui/lib/card/card-title';
import {styles}       from './quizEnd.style.jsx!jsx';

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
            <CardText>
              <h2>content here</h2>
            </CardText>
            <CardActions>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <RaisedButton 
                    label={this.props.endBtnText} 
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



QuizEnd.propTypes = {
  //onValidQuizClick : React.PropTypes.func.isRequired, 
	title	           : React.PropTypes.string.isRequired,
  prevBtnText      : React.PropTypes.string.isRequired,
  endBtnText       : React.PropTypes.string.isRequired,
};