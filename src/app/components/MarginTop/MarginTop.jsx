import React from 'react';

export default class MarginTop extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    
  }

  render(){
    const marginTopValue = [
      this.props.marginTopValue, 
      this.props.marginTopUnit
    ].join('');
    
    return (
      	<div style={ {marginTop : marginTopValue} }></div>	
    );
  }

}
 
MarginTop.propTypes = {
	marginTopValue	: React.PropTypes.number.isRequired,
	marginTopUnit		: React.PropTypes.string.isRequired,
};