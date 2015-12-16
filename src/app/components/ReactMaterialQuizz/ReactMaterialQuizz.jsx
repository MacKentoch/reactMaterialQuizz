import React 		            from 'react';
import { RouteHandler }     from 'react-router';
import AppBar               from 'material-ui/lib/app-bar';
import LeftNav              from 'material-ui/lib/left-nav';
import IconMenu             from 'material-ui/lib/menus/icon-menu';
import MenuItem             from 'material-ui/lib/menus/menu-item';
import IconButton           from 'material-ui/lib/icon-button';
import NavigationMoreVert   from 'material-ui/lib/svg-icons/navigation/more-vert';
import navigationModel      from '../../models/navigationModel.json!json';
import Quiz                 from '../Quiz/Quiz.jsx!';

const HEADER_TITLE      = 'React Material Quizz';

export default class ReactMaterialQuizz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state = {
      navigationList  : navigationModel,
      headerTitle     : HEADER_TITLE,
      leftNavOpen     : false
    };
  }
  
  componentWillMount() {
    
  }
  
  handleChangeRequestLeftNav(){
    let previousOpenState = this.state.leftNavOpen;
    this.setState({ leftNavOpen: !previousOpenState });    
  }


  render(){
    return (
			<div>
        <LeftNav 
          ref="leftNav" 
          docked={false}
          open={this.state.leftNavOpen}
          onRequestChange={()=>this.handleChangeRequestLeftNav()}>
          <MenuItem index={0}>
            Home
          </MenuItem>
          <MenuItem index={1}>
            Quiz
          </MenuItem>
        </LeftNav>				
        <AppBar
          title={this.state.headerTitle}
          onLeftIconButtonTouchTap={()=>this.handleChangeRequestLeftNav()}
          isInitiallyOpen={true}
          iconElementRight={
            <IconMenu iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}>
            {
              this.state.navigationList.map((listItem)=>{
                return (
                  <MenuItem key={listItem.id} primaryText={listItem.label} />
                )
              })
            }
            </IconMenu>
          } />
          <Quiz /> 
			</div>
    );
  }

 
}

