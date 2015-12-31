import React                    from 'react';
import classNames               from 'classnames';

import Paper                    from 'material-ui/lib/paper';
import Card                     from 'material-ui/lib/card/card';
import CardActions              from 'material-ui/lib/card/card-actions';
import CardText                 from 'material-ui/lib/card/card-text';
import CardTitle                from 'material-ui/lib/card/card-title';
import {styles}                 from './home.style.jsx!jsx';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    this.state = {
      animated          : true,
      viewEnters        : false
    };
  }
   
  componentDidMount(){
    console.info('home view will did mount');
    this.setState({
      viewEnters       : true 
    });    
  }

  componentWillUnmount(){
    console.info('home view will unmount');
    this.setState({
      viewEnters       : false 
    });     
  }

  render(){
    
    let homeViewClasses = classNames({
      'animatedViews'    : this.state.animated,
      'view-enter'       : this.state.viewEnters
    });    
    
    console.info(`
    ------------------------
    home renders now
    ------------------------
    `);
        
    return ( 
      <section 
         key="homeView"
         className={homeViewClasses}>            
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <h2>{this.context.translate.HOME_TITRE_1_QUIZZ}</h2>
            <h3>{this.context.translate.HOME_TITRE_2_QUIZZ}</h3>
            <p>{this.context.translate.HOME_DETAIL_TEXT}</p>          
          </div>
        </div>
      </section>   
    );
  }


}

Home.contextTypes = {
  muiTheme  : React.PropTypes.object,
  translate : React.PropTypes.object
}
