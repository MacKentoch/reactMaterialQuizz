import React          from 'react';
import Tabs           from 'material-ui/lib/tabs/tabs';
import Tab            from 'material-ui/lib/tabs/tab';
import Paper          from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';



const styles = {
  slideContainer: {
    height: 400
  },
  slide: {
    //padding: 15,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.init();
    
  }
  
  init(){
    this.state ={
      slideIndex : 0
    };
  }
  
  handleChangeTabs(value, e, tab){
   this.setState({
      slideIndex : value,
    });     
  }
  
  handleChangeIndex(index, fromIndex){
    console.dir(); 
    this.setState({
      slideIndex : index,
    });    
  }
  
  render(){
    return (
      <div className="row" style={{marginTop:'70px'}}>
        <div className="col-md-8 col-md-offset-2" style={{padding:'0px'}}>
          <Paper zDepth={1}>
            <Tabs onChange={(value, e, tab)=>this.handleChangeTabs(value, e, tab)} value={this.state.slideIndex + ''}>
              <Tab label="Tab One" value="0" />
              <Tab label="Tab Two" value="1" />
              <Tab label="Tab Three" value="2" />
            </Tabs>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={(index, fromIndex)=>this.handleChangeIndex(index, fromIndex)}>
              <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                  <h2 style={styles.headline}>Tabs with slide effect</h2>
                  <p>Swipe to see the next slide.</p>
                </div>
              </div>
              <div style={styles.slide}>
                slide n°2
              </div>
              <div style={styles.slide}>
                slide n°3
              </div>
            </SwipeableViews> 
          </Paper>
        </div>
      </div>
    );
  }


}