var React = require('react');
var Style = require('./style.css');

module.exports = React.createClass({
	render(){
		return <div className={Style.container}>
			<div className={Style.mask}></div>
			<div className={Style.name}>text</div>
		</div>
	}
});