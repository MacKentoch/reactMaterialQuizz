import './style.css!';                            //import application custom style
import 'flexboxgrid/dist/flexboxgrid.min.css!';   //flexboxgrid css 
//import 'font-awesome';                            //font-awesome icons
import 'animateCss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Router, { 
  Route,
  IndexRoute,
  DefaultRoute, 
  NotFoundRoute, 
  Redirect, 
  Link 
 }                              from 'react-router';
//import createBrowserHistory     from 'history/lib/createBrowserHistory'
import { 
  createHistory, 
  useBasename 
}                               from 'history';
import injectTapEventPlugin     from 'react-tap-event-plugin';        //Material UI needed until v1.0.x is released
import Routes                   from './components/Routes/Routes.jsx!';

import ReactMaterialQuizz       from './components/ReactMaterialQuizz/ReactMaterialQuizz.jsx!'; //APP
import Home                     from './components/Home/Home.jsx!';   //Home view
import Quiz                     from './components/Quiz/Quiz.jsx!';   //Quiz view
import About                    from './components/About/About.jsx!'; //About view

injectTapEventPlugin(); //needed for Material-UI click and tap event...
 
 
 
const browserHistory = useBasename(createHistory)({
    basename: "/"
}); 
 
ReactDOM.render(
  
  <Router history={browserHistory}>
    <Route path='/' component={ReactMaterialQuizz}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path="quiz" component={Quiz} />
    </Route>
  </Router>,
  document.getElementById('root')
);
