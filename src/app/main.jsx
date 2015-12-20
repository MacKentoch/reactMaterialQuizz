import './style.css!';                            //import application custom style
import 'flexboxgrid/dist/flexboxgrid.min.css!';   //flexboxgrid css 
//import 'font-awesome';                          //font-awesome icons : jspm bundle sfx can't handle (right now) assets like fonts, so just insert link tag in html
import 'animateCss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import injectTapEventPlugin     from 'react-tap-event-plugin';            //Material UI needed until v1.0.x is released
import {Routes}                 from './components/Routes/Routes.jsx!';   


injectTapEventPlugin(); //needed for Material-UI click and tap event...
 

ReactDOM.render(<div>{Routes}</div> ,document.getElementById('root')
);



