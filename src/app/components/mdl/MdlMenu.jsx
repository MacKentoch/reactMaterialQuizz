import React from 'react';

export default class MdlMenu extends React.Component{
  
  constructor(props){
    super(props);
  }
  
  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }
  
  render(){
    const {
      materialIcon,
      children
    } = this.props;
    
    const Menus;
    
    return (
      <div>
        <button id="demo-menu-lower-right"
                class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>

        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for="demo-menu-lower-right">
          <li class="mdl-menu__item">Some Action</li>
          <li class="mdl-menu__item">Another Action</li>
          <li disabled class="mdl-menu__item">Disabled Action</li>
          <li class="mdl-menu__item">Yet Another Action</li>
        </ul>
      </div>      
    );
  }  
  
}


MdlMenu.propTypes = {
  materialIcon  : React.PropTypes.string,
  menus         : React.PropTypes.arrayOf(
    React.propTypes.shape({
      "name"      : React.PropTypes.string.isRequired,
      "disabled"  : React.PropTypes.bool.isRequired
    })
  ), 
  children      : React.PropTypes.node
};

MdlMenu.defaultProps = {
 materialIcon      : 'more_vert'
};