import React 		               from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { 
  RouteHandler, 
  Link 
}                               from 'react-router';
import AppBar                   from 'material-ui/lib/app-bar';
import LeftNav                  from 'material-ui/lib/left-nav';
import IconMenu                 from 'material-ui/lib/menus/icon-menu';
import Menu                     from 'material-ui/lib/menus/menu';
import MenuItem                 from 'material-ui/lib/menus/menu-item';
import List                     from 'material-ui/lib/lists/list';
import Divider                  from 'material-ui/lib/divider';
import FlatButton               from 'material-ui/lib/flat-button';
import ListItem                 from 'material-ui/lib/lists/list-item';
import IconButton               from 'material-ui/lib/icon-button';
import NavigationMoreVert       from 'material-ui/lib/svg-icons/navigation/more-vert';
import FontIcon                 from 'material-ui/lib/font-icon';
import Dialog                   from 'material-ui/lib/dialog';
import RadioButton              from 'material-ui/lib/radio-button';
import RadioButtonGroup         from 'material-ui/lib/radio-button-group';
import Snackbar                 from 'material-ui/lib/snackbar';
import ThemeManager             from 'material-ui/lib/styles/theme-manager';
import MyRawTheme               from '../../shared/quizRawTheme.jsx!jsx';
import MarginTop                from '../MarginTop/MarginTop.jsx!jsx';
import {styles}                 from './ReactMaterialQuizz.style.jsx!jsx';

import TranslateIcon            from 'material-ui/lib/svg-icons/action/translate';

import navigationModel          from '../../models/navigationModel.json!json';
import appBarMenuModel          from '../../models/appBarMenuModel.json!json';
import Quiz                     from '../Quiz/Quiz.jsx!jsx';
import localEN                  from '../../i18n/local_en.json!json';
import localFR                  from '../../i18n/local_fr.json!json';


import MdlLayoutContainer       from '../mdl/MdlLayoutContainer.jsx!jsx';
import MdlAppNavBar             from '../mdl/MdlAppNavBar.jsx!jsx';
import MdlDrawer                from '../mdl/MdlDrawer.jsx!jsx';
import MdlMain                  from '../mdl/MdlMain.jsx!jsx';


const HEADER_TITLE  = 'React Material Quizz';
const GITHUB_LINK   = 'https://github.com/MacKentoch/reactMaterialQuizz';


export default class ReactMaterialQuizz extends React.Component {
  
  //in pure ES6 go end class definition or in ES6+ you can use static :
  //You could even use ES7 decorator see : material-ui/lib/styles/theme-decorator
  // static childContextTypes = {
  //   muiTheme: React.PropTypes.object,
  //   language: React.PropTypes.string 
  // }
  
  constructor(props) {
    super(props);
    this.init();
  }

  init(){
    const navigatorLanguage = (navigator.language || navigator.browserLanguage).split('-')[0] || 'en'; //en is fallback language
    
    this.state = {
      language                : navigatorLanguage,
      translate               : this.getTranslations(navigatorLanguage), 
      navigationList          : navigationModel,
      appBarMenuList          : appBarMenuModel,
      headerTitle             : HEADER_TITLE,
      leftNavOpen             : false,
      langDialogOpened        : false,
      snakBarAutoHideDuration : 2000,
      snackbarOpened          : false,
      snackbarMessage         : '',
      snackbarAction          : ''  
    };
  }
  
  getChildContext() {
    return {
      muiTheme  : ThemeManager.getMuiTheme(MyRawTheme),
      language  : this.state.language,
      translate : this.state.translate
    };
  }  
  
  getTranslations(currentLanguage){
    let translation = Object.assign({}, localEN); //fallback language is En
    if(currentLanguage === 'en') translation = Object.assign({}, localEN);
    if(currentLanguage === 'fr') translation = Object.assign({}, localFR);
    return translation;
  }
  
  componentWillMount() {

  }
  
  // componentDidUpdate() {
  //   componentHandler.upgradeDom(); // MDL - React trick This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
  // }  
  
  render(){ 
    const { pathname }    = this.props.location;
    const navigation = [
      {label : 'home'},
      {label : 'quiz'}
    ];
    return (
      <MdlLayoutContainer>        
        <MdlAppNavBar />
        <MdlDrawer 
          title={HEADER_TITLE}
          navigation={navigation}
          onSelection={()=>true}
        />
      <main className="mdl-layout__content">
        <div className="page-content">
          <ReactCSSTransitionGroup
              component="div"
              transitionName="routeAnimated" 
              transitionEnterTimeout={500} 
              transitionLeaveTimeout={500}> 
            {React.cloneElement(this.props.children, { key: pathname })}                   
          </ReactCSSTransitionGroup>        
        </div>
      </main>
      </MdlLayoutContainer>
    );
  }

 
}

ReactMaterialQuizz.childContextTypes = {
  muiTheme  : React.PropTypes.object,
  language  : React.PropTypes.string,
  translate : React.PropTypes.object
};

