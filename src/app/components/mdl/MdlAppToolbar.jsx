import React            from 'react';

export default class AppNavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  }

  render(){
    const {
      title,
      children,
      ...others
    } = this.props;
    
    return (
      <header className="mdl-layout__header" {...others}>
        <div className="mdl-layout__header-row">
          <span class="mdl-layout-title">{title}</span>
          <div className="mdl-layout-spacer"></div>          
          {children}
        </div>
      </header>
    );
  }

}

AppNavBar.propTypes = {
  title     : React.PropTypes.string,
  children  : React.PropTypes.node
};

AppNavBar.defaultProps = {
 title      : ''
};
