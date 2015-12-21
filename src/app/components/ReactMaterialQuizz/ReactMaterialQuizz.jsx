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
import ListDivider              from 'material-ui/lib/lists/list-divider';
import ListItem                 from 'material-ui/lib/lists/list-item';
import IconButton               from 'material-ui/lib/icon-button';
import NavigationMoreVert       from 'material-ui/lib/svg-icons/navigation/more-vert';
import FontIcon                 from 'material-ui/lib/font-icon';
import Dialog                   from 'material-ui/lib/dialog';
import RadioButton              from 'material-ui/lib/radio-button';
import RadioButtonGroup         from 'material-ui/lib/radio-button-group';
import ThemeManager             from 'material-ui/lib/styles/theme-manager';
import MyRawTheme               from '../../shared/quizRawTheme';
import MarginTop                from '../MarginTop/MarginTop.jsx!';
import {styles}                 from './ReactMaterialQuizz.style';

import TranslateIcon            from 'material-ui/lib/svg-icons/action/translate';

import navigationModel          from '../../models/navigationModel.json!json';
import appBarMenuModel          from '../../models/appBarMenuModel.json!json';
import Quiz                     from '../Quiz/Quiz.jsx!';

const HEADER_TITLE = 'React Material Quizz';

export default class ReactMaterialQuizz extends React.Component {
  
  //in pure ES6 go around lines 90 or in ES6+ you can use static :
  //You could even use ES7 decorator see : material-ui/lib/styles/theme-decorator
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    language: React.PropTypes.string 
  }
  
  
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
      language        : (navigator.language || navigator.browserLanguage).split('-')[0] || 'en', //en is fallback lang
      navigationList  : navigationModel,
      appBarMenuList  : appBarMenuModel,
      headerTitle     : HEADER_TITLE,
      leftNavOpen     : false,
      langDialogOpened: false
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
      langDialogOpened: true
    });
  }
  
  handleCloseLanguageDialog(){
    this.setState({
      langDialogOpened: false
    });
  }  
  
  handleLanguageSelect(){
    //TODO setState to language selected
  }
   
  navigationTo(event, selectedRoute) {
    //more info on react router v1.0.0+ : http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.history.pushState(null, selectedRoute); 
 
    let previousOpenState = this.state.leftNavOpen;
    this.setState({ leftNavOpen: !previousOpenState });     
  }

  getLanguageSelectDialog(){
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Valid', ref: 'valid' }
    ];
    
    return (
      <Dialog
        title="Select your language"
        actions={standardActions}
        actionFocus="valid"
        open={this.state.langDialogOpened}
        onRequestClose={()=>this.handleCloseLanguageDialog()}>
        
        <RadioButtonGroup 
          name="languageSelection" 
          defaultSelected="en">
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


  render(){
    
    const _menuList = this.state.appBarMenuList.map((menu)=>{
      let _ListDivider;
      if((menu.key || 0)  > 0){
        _ListDivider = <ListDivider inset={false}/>;
      }
      let _icon;
      if(menu.text === 'github')    _icon = <FontIcon className="fa fa-github" /> 
      if(menu.text === 'language')  _icon = <TranslateIcon />
      
      
      return (
        <div key={menu.key}>
          {_ListDivider}
          <ListItem
            key={menu.key}
            primaryText={menu.text} 
            leftIcon={_icon}
            onClick={()=>this.handleOpenLanguageDialog()} 
          />
        </div>
      );
    });
    
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
  
    
    const { pathname } = this.props.location
    //console.info(`app pathname : ${pathname}`);
    // Only take the first-level part of the path as key, instead of the whole path.
    //const key = pathname.split('/')[1] || 'root'

    const languageDialog = this.getLanguageSelectDialog();
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
        <ListDivider inset={false}/>  
        <List subheader="navigation">
          {_leftNavList}
        </List>
        <ListDivider inset={false}/>   
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
			</div>
    );
  }

 
}

// ReactMaterialQuizz.childContextTypes = {
//   muiTheme  : React.PropTypes.object
// };


//{React.cloneElement(this.props.children || <div />, { key: pathname })}