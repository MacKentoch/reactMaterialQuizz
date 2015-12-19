import React    from 'react';
import Paper    from 'material-ui/lib/paper';
import {styles} from './about.style';

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.init();
  }
  
  init(){
    
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2" 
             style={Object.assign({}, styles.about)}>
          <Paper 
            zDepth={1}
            style={{postion : 'absolute'}}>
            <h1>About view</h1>
          </Paper>  
        </div>
      </div>
    );
  }


}