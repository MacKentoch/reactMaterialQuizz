import React          from 'react';

export default class QuizQuestions extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
		
	}
	
	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1>
						Quiz Questions
					</h1>
				</div>
			</div>
		);
	}
}