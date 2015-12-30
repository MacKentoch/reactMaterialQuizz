//TODO : to ad dmore customisation to change applciation layout (fixed nav, fixed sidenav...)

/**
* COMPONENT : MdlLayoutContainer
* WHAT FOR  : You application container - IMPORTANT : should be top root mdl component of your application 
*
* PROPS     : 
*   - children  : {node} : REQUIRED - no default value  
**/


import React            from 'react';

export default class MdlLayoutContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){    
    return (
      <div className="mdl-layout__container">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        {this.props.children}
       </div>
      </div> 
    );
  }

}

MdlLayoutContainer.propTypes = {
  children  : React.PropTypes.node.isRequired
};