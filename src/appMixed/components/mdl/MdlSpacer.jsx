/**
* COMPONENT : MdlSpacer
* WHAT FOR  : Add spacer to align following elements/components to the right 
*
* PROPS     : NONE 
**/


import React            from 'react';

export default class MdlSpacer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }

  render(){    
    return (
      <div className="mdl-layout-spacer"></div>
    );
  }

}

