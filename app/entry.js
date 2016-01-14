import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import path from 'path'
import store from 'store'

global.baseStyle = require('./Resource/base.css');
global.component = function(name) {return require('./Component/' + name + '/module.js');}
global.page = function(name) {return require('./Page/' + name + '/module.js');}
global.model = function(name) {return require('./Model/' + name + '.js');}

var Main = page('Main');
var Index = page('Index');
var Happy = page('Happy');
var Supper = page('Supper');


model('DB').initDB().then(function(){
	model('PrepareBigBonus').prepareData();
	model('HappyBonus').prepareData();
})


render(
<Router>
	<Route path="/" component={Main}>
		<IndexRoute component={Index} />
		<Route path="happy" component={Happy} />
		<Route path="supper" component={Supper} />
	</Route>
</Router>, document.getElementById('react-container')); 