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

var sql = require('./Resource/db.sql');
var db = global.openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
	sql.split(';\n').map((l)=>{
		tx.executeSql(l, [], function(){}, function(a, e){console.log(l, e);});
	});
	tx.executeSql('UPDATE member SET level = 1 WHERE month >= 12');
	tx.executeSql('UPDATE member SET level = 0 WHERE name in ("张伟", "冯海云") OR month<12');
});

render(
<Router>
	<Route path="/" component={Main}>
		<IndexRoute component={Index} />
		<Route path="happy" component={Happy} />
		<Route path="supper" component={Supper} />
	</Route>
</Router>, document.getElementById('react-container')); 