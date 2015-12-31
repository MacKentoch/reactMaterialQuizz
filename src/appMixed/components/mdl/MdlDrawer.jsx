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
*       - NavigationItem_Object.label         : {string}    :  REQUIRED   - no default
*       - NavigationItem_Object.route         : {string}    : optional    - default = ''
*       - NavigationItem_Object.mdlIconName   : {string}    : optional    - no default
*
*   - onSelection  : {function(event, navigationItemLabel, route)}  :  optional  - no default
*        
**/


import React            from 'react';
import MdlIcon          from './MdlIcon.jsx!jsx';
import {styles}         from './MdlDrawer.style.jsx!jsx';

export default class MdlDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleMenuClick(event, navigationItemLabel, navigationRoute){
    event.preventDefault();
    this.props.onSelection(event, navigationItemLabel, navigationRoute);
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
              let navigationRoute = navigationItem.route || '';
              let mdlIcon = '';
              if(typeof navigationItem.mdlIconName !== 'undefined') {
                mdlIcon = (
                  <MdlIcon
                    style={Object.assign({}, styles.navItemIcon)} 
                    iconName={navigationItem.mdlIconName} 
                  />
                );
              }
              
              return (
                <a 
                  key={navigationItemIndex}
                  style={Object.assign({}, styles.navItem)}
                  className="mdl-navigation__link" 
                  href=""
                  onClick={(e)=>this.handleMenuClick(e, navigationItem.label, navigationRoute)}>
                  {mdlIcon}
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
      "route"       : React.PropTypes.string, 
      "mdlIconName" : React.PropTypes.string
    }).isRequired
  ).isRequired,
  onSelection   : React.PropTypes.func  
};

MdlDrawer.defaultProps = {
 title      : ''
};
