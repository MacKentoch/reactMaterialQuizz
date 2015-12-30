/**
* COMPONENT : MdlDrawer
* WHAT FOR  : material design lite sidebar or sideMenu
*
* PROPS     : 
*
*   - title         : {string} : optional - default value = ''
*
*   - navigation    : {array of NavigationItem_Object}  : REQUIRED - no default
*     - NavigationItem_Object   : {Object} :  REQUIRED - no default
*       - NavigationItem_Object.label        : {string}    :  REQUIRED   - no default
*
*   - onSelection  : {function(event, navigationItemLabel)}  :  optional  - no default
*        
**/


import React            from 'react';

export default class MdlDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }
    
  handleMenuClick(event, navigationItemLabel){
    this.props.onSelection(event, navigationItemLabel);
  }

  render(){
    const {
      title,
      navigation,
      ...others
    } = this.props;
    
    return (
      <div className="mdl-layout__drawer mdl-shadow--2dp" {...others}>
        <span className="mdl-layout-title">{title}</span>
        <nav className="mdl-navigation">
          {
            navigation.map((navigationItem, navigationItemIndex)=>{
              return (
                <a 
                  key={navigationItemIndex}
                  className="mdl-navigation__link" 
                  href="#"
                  onClick={(e)=>this.handleMenuClick(e, navigationItem.label)}>
                  {navigationItem.label}
                </a>
              );              
            })
          }
        </nav>
      </div>
    );
  }

}

MdlDrawer.propTypes = {
  title         : React.PropTypes.string,
  navigation    : React.PropTypes.arrayOf(
    React.PropTypes.shape({
      "label"       : React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSelection   : React.PropTypes.func  
};

MdlDrawer.defaultProps = {
 title      : ''
};
