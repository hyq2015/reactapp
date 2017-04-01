import 'core-js/fn/object/assign';
import FastClick from 'fastclick';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Play from './components/Play';
import Mall from './components/Mall';
import Mine from './components/Mine';
import './static/styles/reset.css';
import { Router, Route, IndexRoute, Link ,hashHistory } from 'react-router';

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
// Render the main component into the dom
ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="play" components={Play} />
      <Route path="mall" components={Mall}>
        <Route path="users/:userId" component={App} />
      </Route>
      <Route path="mine" components={Mine} />
    </Route>
</Router>), document.getElementById('app'));
