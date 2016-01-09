import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import path from 'path'

global.$ = require('jquery');
global.baseStyle = require('./Resource/base.css');
global.component = function(name) {
	return require('./Component/' + name + '/module.js');
}
global.page = function(name) {
	return require('./Page/' + name + '/module.js');
}

var Main = page('Main');
var Index = page('Index');
var Happy = page('Happy');
var Supper = page('Supper');


render(
<Router>
	<Route path="/" component={Main}>
		<IndexRoute component={Index} />
		<Route path="happy" component={Happy} />
		<Route path="supper" component={Supper} />
	</Route>
</Router>, document.getElementById('react-container')); 