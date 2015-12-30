import React from 'react';

export default class MdlMenu extends React.Component{
  
  constructor(props){
    super(props);
  }
  
  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }
  
  
  handleMenuClick(event, menuItemIndex){
    if(typeof this.props.onSelection !== 'undefined'){
      this.props.onSelection(menuId, menuItemIndex);
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
            onClick={(e)=>this.handleMenuClick(e, menuItemIndex)}>
            {menuItem.name}          
          </li>
        );        
      }else{
        return (
          <li 
            key={menuItemIndex}
            className="mdl-menu__item" 
            onClick={(e)=>this.handleMenuClick(e, menuItemIndex)}>
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
                class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">{materialIcon}</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for={menuId}>
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
      "disabled"    : React.PropTypes.bool.isRequired,
      "onSelection" : React.PropTypes.func
    }).isRequired
  )
};

MdlMenu.defaultProps = {
 materialIcon      : 'more_vert'
};