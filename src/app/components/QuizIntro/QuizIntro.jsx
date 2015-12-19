import React          from 'react';

export default class QuizIntro extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
    console.info('check QuizIntro init state');
    console.dir({
      title     : this.props.title,
      subtitle  : this.props.subtitle,
      body      : this.props.body,
      goBtnText : this.props.goBtnText
    });		
	}
	
	render(){
		return (
			<div className="row">
				<div className="col-xs-12">
					<h1>
						Introduction
            <h2>{this.props.title}</h2>
            <p>this.props.subtitle</p>
					</h1>
				</div>
			</div>
		);
	}
}


QuizIntro.propTypes = {
	title	      : React.PropTypes.string.isRequired,
	subtitle		: React.PropTypes.string.isRequired,
  body		    : React.PropTypes.string.isRequired,
  goBtnText   : React.PropTypes.string.isRequired
};