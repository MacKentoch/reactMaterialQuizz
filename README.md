React JS material quizz
=========

[![GitHub version](https://badge.fury.io/gh/MacKentoch%2FreactMaterialQuizz.svg)](https://badge.fury.io/gh/MacKentoch%2FreactMaterialQuizz)

This is a simple dynamic quiz in [ReactJS](https://facebook.github.io/react/) designed following [google material guidelines](https://www.google.com/design/spec/material-design/introduction.html) thanks to nice [material UI](http://www.material-ui.com) and [google material design lite](http://www.getmdl.io/index.html).

**feature :** 

- ReactJS (> 0.14)
- react-router (> 1.0.0)
- JedWatson/classnames (*my preferred way to add animations rather than react-addons-css-transition-group*)
- Material UI (>0.14.0+) (+ *react-tap-event-plugin*)
- Material Design lite
- animate.css
- font-awesome
- ES6
- jspm 
- babel (< 6)
- gulp 


##Intallation :

Clone or download then :

```bash
$ npm install 
$ jspm install
```

*Note :*

*Be sure to have JSPM installed otherwise install it before :*
```bash
npm install jspm -g
```


##Launch app : 

1- **warrior way** : start a server 
```bash
jspm-server
```

1- **fast way** : just click 
[preview here](https://rawgit.com/MacKentoch/reactMaterialQuizz/v1.2.2/public/index.html)


##WHAT'S NEXT

- [ ] babel 6+
- [ ] webpack version
- [ ] hot reloading (*should be linked to webpack version*)
- [ ] unit tests


Note : jspm v0.17.x should be 
- compatible with babel 6+
- able to offer hot reload

>If so, considering how simple and fast it is set up and future orientated nature (*with http2 we would have no more need to bundle*), JSPM may stay my preferred tool in my workflows. I don't mean webpack is bad. Webpack is powerfull the most widespread and offers more today. But imagine a new comer in javascript dev world, which one would he choose between webpack and jspm to give the same result? 

##License

The MIT License (MIT)

Copyright (c) 2015 Erwan DATIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
