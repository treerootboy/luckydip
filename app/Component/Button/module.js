var React = require('react');
var Style = require('./style.css');
module.exports = React.createClass({
	render(){
		return <div className={Style[this.props.type]||Style.base} onClick={this.props.onClick}>
			{this.props.children}
		</div>
	}
});