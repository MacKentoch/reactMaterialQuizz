import './style.css!';  //import application custom style

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Router, { 
  Route, 
  DefaultRoute, 
  NotFoundRoute, 
  Redirect, 
  Link 
 }                              from 'react-router';
import injectTapEventPlugin     from 'react-tap-event-plugin'; //Material UI needed until v1.0.x is released
import Routes                   from './components/Routes/Routes.jsx!';
import ReactMaterialQuizz       from './components/ReactMaterialQuizz/ReactMaterialQuizz.jsx!'; //APP
import Home                     from './components/Home/Home.jsx!';   //Home view
import Quiz                     from './components/Quiz/Quiz.jsx!';   //Quiz view
import About                    from './components/About/About.jsx!'; //About view

injectTapEventPlugin(); //needed for Material-UI click and tap event...

ReactDOM.render(
  <ReactMaterialQuizz />,
  document.getElementById('root')
);
