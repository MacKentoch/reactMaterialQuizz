import './style.css!';  //import application style

//import 'material-design-lite/material.min.js'; //MDL js


import React                from 'react';
import ReactDOM             from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; //Material UI needed until v1.0.x
import ReactMaterialQuizz   from './components/ReactMaterialQuizz/ReactMaterialQuizz.jsx!';



//console.info(`React js version : ${React.version}`);


injectTapEventPlugin(); //needed for Material-UI click and tap event...

ReactDOM.render(
  <ReactMaterialQuizz />,
  document.getElementById('root')
);
