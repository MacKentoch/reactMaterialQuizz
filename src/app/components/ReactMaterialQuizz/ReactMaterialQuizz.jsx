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
import MyRawTheme               from '../../shared/quizRawTheme';
import MarginTop                from '../MarginTop/MarginTop.jsx!';
import {styles}                 from './ReactMaterialQuizz.style';

import TranslateIcon            from 'material-ui/lib/svg-icons/action/translate';

import navigationModel          from '../../models/navigationModel.json!json';
import appBarMenuModel          from '../../models/appBarMenuModel.json!json';
import Quiz                     from '../Quiz/Quiz.jsx!';

const HEADER_TITLE = 'React Material Quizz';

export let __liveReload = true;

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


  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
      language: this.state.language
    };
  }
  
  
  init(){
    this.state = {
      language                : (navigator.language || navigator.browserLanguage).split('-')[0] || 'en', //en is fallback lang
      navigationList          : navigationModel,
      appBarMenuList          : appBarMenuModel,
      headerTitle             : HEADER_TITLE,
      leftNavOpen             : false,
      langDialogOpened        : false,
      snakBarAutoHideDuration : 1000,
      snackbarOpened          : false,
      snackbarMessage         : '',
      snackbarAction          : ''  
    };
  }
  
  componentWillMount() {
    
  }
  
  
  handleChangeRequestLeftNav(){
    let previousOpenState = this.state.leftNavOpen;
    this.setState({ leftNavOpen: !previousOpenState });    
  }
  
  
  handleOpenLanguageDialog(){
    this.setState({
      langDialogOpened        : true,
      snackbarOpened          : true,
      snackbarMessage         : `Current language is set to :  ${this.state.language}`,
      snackbarAction          : 'close' 
    });
  }
  
  
  handleCloseLanguageDialog(){
    this.setState({
      langDialogOpened: false
    });
  }   
  
  
  handleLanguageSelect(event, selected){
    this.setState({
      language                : selected     
    });
  }
   
   
  navigationTo(event, selectedRoute) {
    //more info on react router v1.0.0+ : http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.history.pushState(null, selectedRoute); 
 
    let previousOpenState = this.state.leftNavOpen;
    this.setState({ leftNavOpen: !previousOpenState });     
  }


  getLanguageSelectDialog(){    
    let customActions = [
      <FlatButton
        label="Cancel"
        secondary={false}
        onTouchTap={()=>this.handleCloseLanguageDialog()} />,
      <FlatButton
        label="Valid"
        primary={false}
        onTouchTap={()=>this.handleCloseLanguageDialog()} />
    ];    
    
    return (
      <Dialog
        title="Select your language"
        actions={customActions}
        width={'300px'}
        contentStyle={{ zIndex: 10 }}
        open={this.state.langDialogOpened}
        onRequestClose={()=>this.handleCloseLanguageDialog()}>
        
        <RadioButtonGroup 
          name="languageSelection" 
          defaultSelected={this.state.language}
          onChange={(event, selected)=>this.handleLanguageSelect(event, selected)}>
        <RadioButton
          value="en"
          label="english" 
          style={{marginBottom:16}} />
        <RadioButton
          value="fr"
          label="french"
          style={{marginBottom:16}}/>
        </RadioButtonGroup>        
        
      </Dialog>    
    );
  }


  getLeftnavListTemplate(){
    const _leftNavList = this.state.navigationList.map((navList)=>{
      let _marginTop;
      if((navList.id || 0) === 1){
        _marginTop = <MarginTop marginTopValue={15} marginTopUnit={'px'}  />;
      } 
      
      let _icon = <FontIcon className={navList.className} />;
                    
      return (        
        <div key={navList.id}>
          {_marginTop}
          <ListItem
            key={navList.id}
            
            primaryText={navList.text}
            onClick={(event, navIndex)=>this.navigationTo(event, navList.route)}
            leftIcon={_icon} />
        </div>        
      );             
    });
    return _leftNavList;  
  }
  
  
  getAppBarMenuListTemplate(){
    const _menuList = this.state.appBarMenuList.map((menu)=>{
      let _Divider;
      if((menu.key || 0)  > 0){
        _Divider = <Divider inset={false}/>;
      }
      let _icon;
      if(menu.text === 'github')    _icon = <FontIcon className="fa fa-github" /> 
      if(menu.text === 'language')  _icon = <TranslateIcon />
      
      return (
        <div key={menu.key}>
          {_Divider}
          <ListItem
            key={menu.key}   
            primaryText={menu.text}
            leftIcon={_icon}
            onClick={()=>this.handleOpenLanguageDialog()} 
          />
        </div>
      );
    });
    return _menuList;   
  }


  render(){ 
    
    const _menuList       = this.getAppBarMenuListTemplate();
    const _leftNavList    = this.getLeftnavListTemplate();
    const languageDialog  = this.getLanguageSelectDialog();
    const { pathname }    = this.props.location
    //console.info(`app pathname : ${pathname}`);
    // Only take the first-level part of the path as key, instead of the whole path.
    //const key = pathname.split('/')[1] || 'root'

    return (
			<div>
        <LeftNav 
          ref="leftNav" 
          docked={false}
          open={this.state.leftNavOpen}
          onRequestChange={()=>this.handleChangeRequestLeftNav()}>
        <MarginTop 
          marginTopValue={60}
          marginTopUnit={'px'}  /> 
        <Divider inset={false}/>  
        <List subheader="navigation">
          {_leftNavList}
        </List>
        <Divider inset={false}/>   
        </LeftNav>				
        <AppBar
          title={this.state.headerTitle}
          onLeftIconButtonTouchTap={()=>this.handleChangeRequestLeftNav()}
          isInitiallyOpen={true}
          iconElementRight={
          <IconMenu iconButtonElement={
            <IconButton><NavigationMoreVert /></IconButton>}>
            <List 
              style={styles.iconMenuList}>
              {_menuList}
            </List>
          </IconMenu>
          } />
        <ReactCSSTransitionGroup
            component="div"
            transitionName="routeAnimated" 
            transitionEnterTimeout={500} 
            transitionLeaveTimeout={500}> 
          <div key={pathname}>
            {this.props.children}
          </div>       
        </ReactCSSTransitionGroup>
        {languageDialog}
        <Snackbar
          open={this.state.snackbarOpened}
          modal={true}
          message={this.state.snackbarMessage}
          action={this.state.snackbarAction}
          autoHideDuration={this.state.snakBarAutoHideDuration} 
         />        
			</div>
    );
  }

 
}

ReactMaterialQuizz.childContextTypes = {
  muiTheme: React.PropTypes.object,
  language: React.PropTypes.string
};

