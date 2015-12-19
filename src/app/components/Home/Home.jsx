import React    from 'react';
import Paper    from 'material-ui/lib/paper';
import {styles} from './home.style';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){

  }

  render(){
    return (
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2" 
             style={Object.assign({}, styles.home)}>
          <Paper 
            zDepth={1} 
            style={{postion : 'absolute'}}>
            <h1>Home view</h1>
          </Paper>  
        </div>
      </div>
    );
  }


}
