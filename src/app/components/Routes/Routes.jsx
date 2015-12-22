import React                    from 'react';
import Router, { 
  Route,
  IndexRoute,
  DefaultRoute, 
  NotFoundRoute, 
  Redirect, 
  Link 
 }                              from 'react-router';
import createBrowserHistory     from 'history/lib/createBrowserHistory';
import ReactMaterialQuizz       from '../ReactMaterialQuizz/ReactMaterialQuizz.jsx!'; //APP
import Home                     from '../Home/Home.jsx!';   //Home view
import Quiz                     from '../Quiz/Quiz.jsx!';   //Quiz view
import About                    from '../About/About.jsx!'; //About view
 
//NOTE : Route is written as a "stateless functionnal component" (= ES6 arrow function is enough to describe it - see React V0.14 major changes) 
export const Routes = ()=>{
  return (
    <Router history={createBrowserHistory()}>
      <Route path='/' component={ReactMaterialQuizz}>
        <IndexRoute component={Home} />
        <Route path='about' component={About} />
        <Route path="quiz" component={Quiz} />
      </Route>
    </Router>
  );
}
