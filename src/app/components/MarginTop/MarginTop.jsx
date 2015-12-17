import React from 'react';

export default class MarginTop extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    
  }

  render(){
    return (
      	<div style={ {marginTop : this.props.marginTopValue + this.props.marginTopUnit} }></div>	
    );
  }

}
 
MarginTop.propTypes = {
	marginTopValue	: React.PropTypes.number.isRequired,
	marginTopUnit		: React.PropTypes.string.isRequired,
};