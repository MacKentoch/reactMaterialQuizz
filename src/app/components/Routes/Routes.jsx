import React                    from 'react';
import Router, { 
  Route,
  IndexRoute
 }                              from 'react-router';
import ReactMaterialQuizz       from '../ReactMaterialQuizz/ReactMaterialQuizz.jsx!jsx'; 
import Home                     from '../Home/Home.jsx!jsx';  
import Quiz                     from '../Quiz/Quiz.jsx!jsx';  
  
// NOTE : Route is written as a "stateless functionnal component" (= ES6 arrow function is enough to describe it - see React V0.14 major changes) 
export const Routes = ()=>{
  return (
    <Router >
      <Route path="/" component={ReactMaterialQuizz}>
        <IndexRoute component={Home} />
        <Route path="quiz" component={Quiz} />
      </Route>
    </Router>
  );
};


// html5 style : static website would not work like that
// export const Routes = ()=>{
//   return (
//     <Router history={createBrowserHistory()}>
//       <Route path="/" component={ReactMaterialQuizz}>
//         <IndexRoute component={Home} />
//         <Route path='about' component={About} />
//         <Route path="quiz" component={Quiz} />
//       </Route>
//     </Router>
//   );
// };