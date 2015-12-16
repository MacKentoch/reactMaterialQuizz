import React          from 'react';

export default class QuizIntro extends React.Component{
	
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
						Introduction
					</h1>
				</div>
			</div>
		);
	}
}