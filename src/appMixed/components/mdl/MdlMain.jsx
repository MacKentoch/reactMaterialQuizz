/**
* COMPONENT : MdlMain
* WHAT FOR  : Main content - rour application main content should be children of this component 
*
* PROPS     : 
*   - children  : {node} : REQUIRED - no default value  
**/


import React            from 'react';

export default class MdlMain extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }

  render(){    
    return (
      <main className="mdl-layout__content">
        <div className="page-content">
          {this.props.children}
       </div>
      </main> 
    );
  }

}

MdlMain.propTypes = {
  children  : React.PropTypes.node.isRequired
};