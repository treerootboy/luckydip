import { Router, Route, Link } from 'react-router'
import React from 'react'

function load(componentName) {
	return require('./Component/'+componentName+'/'+componentName+'.js');
}

var Button = load('Button');
var empty = React.createClass({
	render(){
		return (<div>test</div>);
	}
});
var Happy = require('./Happy.js');
var Supper = require('./Supper.js');

module.exports = React.createClass({
	render() {
		return (
			<div className={global.baseStyle.container}>
				<div className={global.baseStyle.topBtnGroup}>
					<Button><Link to="/">抽大奖名单</Link></Button>
					<Button><Link to="/happy">抽取开心奖</Link></Button>
					<Button><Link to="/supper">抽超级大奖</Link></Button>
				</div>
				<div className={global.baseStyle.body}>
					<Router>
						<Route path="/" component={empty}>
							<Route path="happy" component={Happy} />
							<Route path="supper" component={Supper} />
						</Route>
					</Router>
				</div>
			</div>
		);
	}
});