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
import ReactMaterialQuizz       from '../ReactMaterialQuizz/ReactMaterialQuizz.jsx!jsx'; //APP
import Home                     from '../Home/Home.jsx!jsx';   //Home view
import Quiz                     from '../Quiz/Quiz.jsx!jsx';   //Quiz view
import About                    from '../About/About.jsx!jsx'; //About view
  
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


//html5 style but can't static website :
// export const Routes = ()=>{
//   return (
//     <Router history={createBrowserHistory()}>
//       <Route path='/' component={ReactMaterialQuizz}>
//         <IndexRoute component={Home} />
//         <Route path='about' component={About} />
//         <Route path="quiz" component={Quiz} />
//       </Route>
//     </Router>
//   );
// }
