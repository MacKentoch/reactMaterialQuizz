import React            from 'react';
import classNames       from 'classnames';

import PromisedTimeout  from '../../services/PromisedTimeout.jsx!jsx'; 

import MdlPaper         from '../mdl/MdlPaper.jsx!jsx';
import MdlToolBar       from '../mdl/MdlToolBar.jsx!jsx'

import RaisedButton     from 'material-ui/lib/raised-button';

//import Colors           from 'material-ui/lib/styles/colors';
import {styles}         from './quizIntro.style.jsx!jsx';


export default class QuizIntro extends React.Component{
	
	constructor(props){
		super(props);
		this.init();
	}
	
	init(){
    //console.dir(this.context); //=> context does not exist here
    this.state = {
      animated                : true,
      subTitleAnimationActive : false,
      bodyAnimationActive     : false
    };
	}
  
  // componentWillMount(){ 
  //   ////No more need to change muiTheme
  //   let newMuiTheme = this.context.muiTheme;
  //   
  //   // newMuiTheme.toolbar.backgroundColor = Colors.blue800;
  //   // newMuiTheme.toolbar.titleColor      = '#fff';//'rgba(255,255,255,0.6)';
  //   // newMuiTheme.zIndex.layer            = 5;
  //   // newMuiTheme.zIndex.popover          = 100000;
  //   // newMuiTheme.leftNav.zIndex          = 10000;
  //   this.setState({
  //     muiTheme : newMuiTheme
  //   });
  // }
  
  componentDidMount(){
    let PromisedDelay = new PromisedTimeout();
    
    PromisedDelay
      .delay(500)
      .then(
        ()=>{
          this.setState({
            subTitleAnimationActive : true,
            bodyAnimationActive     : true      
          });        
        }
       );
    

  }
  
  getChildContext() {
    return {
      muiTheme: this.context.muiTheme//this.state.muiTheme
    };
  }  
  
  handleStartQuizClick(){
    this.props.onStartQuizClick({start : true});
  }
	
	render(){  
    let subTitleClasses = classNames({
      'animated'    : this.state.animated,
      'invisible'   : !this.state.subTitleAnimationActive,
      'fadeInDown'  : this.state.subTitleAnimationActive
    });

    let bodyClasses = classNames({
      'animated'    : this.state.animated,
      'invisible'   : !this.state.bodyAnimationActive,
      'fadeInDown'  : this.state.bodyAnimationActive
    });          
          
		return (
      
      <section>
        <MdlToolBar 
          backgdColor={'#3F51B5'}
          textColor={'#fff'}>
          <span className="mdl-layout-title">
            {this.context.translate[this.props.title]}
          </span>
          <div className="mdl-layout-spacer"></div>
        </MdlToolBar>
        <MdlPaper>
          <section id="quizIntroBody">
            <h2 className={subTitleClasses}>
              {this.context.translate[this.props.subtitle]}
            </h2>
            <p className={bodyClasses}>
              {this.context.translate[this.props.body]}
            </p>
          </section>
          <section id="quizIntroActions">
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--4-col mdl-typography--text-center">
                <RaisedButton 
                  label={this.context.translate[this.props.goBtnText]} 
                  primary={true}
                  onClick={()=>this.handleStartQuizClick()} 
                  />  
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>          
          </section>
        </MdlPaper>
     </section> 
		);
	}
}


QuizIntro.propTypes = {
  onStartQuizClick : React.PropTypes.func.isRequired, 
	title	           : React.PropTypes.string.isRequired,
	subtitle		     : React.PropTypes.string.isRequired,
  body		         : React.PropTypes.string.isRequired,
  goBtnText        : React.PropTypes.string.isRequired
};


QuizIntro.contextTypes = {
  muiTheme  : React.PropTypes.object,
  translate : React.PropTypes.object
};

QuizIntro.childContextTypes = {
  muiTheme  : React.PropTypes.object
};
