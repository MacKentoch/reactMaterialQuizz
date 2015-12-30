import React            from 'react';

export default class MdlDrawer extends React.Component {

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
      <div className="mdl-layout__drawer mdl-shadow--2dp">
        <span className="mdl-layout-title">Title</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
    );
  }

}

MdlDrawer.propTypes = {
  title     : React.PropTypes.string,
  children  : React.PropTypes.node
};

MdlDrawer.defaultProps = {
 title      : ''
};
