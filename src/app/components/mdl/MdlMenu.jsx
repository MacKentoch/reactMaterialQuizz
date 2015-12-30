/**
* COMPONENT : MdlMenu
* WHAT FOR  : material design lite Menu
*
* PROPS     : 
*   - menuId        : {string}    : REQUIRED - no default value
*
*   - materialIcon  : {string}    : optional - default value = 'more_vert' -> which is the vertical 3 dots icons
*
*   - menus         : {array of Menu_Object}  : REQUIRED - no default
*     - Menu_Object   : {Object} :  REQUIRED - no default
*       - Menu_Object.name        : {string}    :  REQUIRED   - no default
*       - Menu_Object.disabled    : {bool}      :  REQUIRED   - no default
*
*   - onSelection : {function(event, menuId, menuItemIndex)}  :  optional  - no default
*        
**/

import React from 'react';

export default class MdlMenu extends React.Component{
  
  constructor(props){
    super(props);
  }
  
  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }
  
  
  handleMenuClick(event, menuId, menuItemIndex){
    if(typeof this.props.onSelection !== 'undefined'){
      this.props.onSelection(event, menuId, menuItemIndex);
    }
  }
  
  renderMenuItems(){
    const {menuId, menus} = this.props;
    const MenuItemsTemplate = menus.map((menuItem, menuItemIndex)=>{
      if(menu.disabled){
        return (
          <li 
            key={menuItemIndex}
            disabled 
            className="mdl-menu__item" 
            onClick={(e)=>this.handleMenuClick(e, menuId, menuItemIndex)}>
            {menuItem.name}          
          </li>
        );        
      }else{
        return (
          <li 
            key={menuItemIndex}
            className="mdl-menu__item" 
            onClick={(e)=>this.handleMenuClick(e, menuId, menuItemIndex)}>
            {menuItem.name}          
          </li>
        );        
      }
    });
    return MenuItemsTemplate;    
  }
  
  render(){
    const {
      menuId,
      materialIcon,
      menus,
      ...others
    } = this.props;
    
    const MenuItemsTemplate = this.renderMenuItems();
    
    return (
      <div {..others}>
        <button id={menuId}
                className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">{materialIcon}</i>
        </button>
        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor={menuId}>
          {MenuItemsTemplate}
        </ul>
      </div>      
    );
  }  
  
}


MdlMenu.propTypes = {
  menuId        : React.PropTypes.string.isRequired,
  materialIcon  : React.PropTypes.string,
  menus         : React.PropTypes.arrayOf(
    React.propTypes.shape({
      "name"        : React.PropTypes.string.isRequired,
      "disabled"    : React.PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  onSelection   : React.PropTypes.func  
};

MdlMenu.defaultProps = {
 materialIcon      : 'more_vert'
};