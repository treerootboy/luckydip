var React = require('react');
var Style = require('./Button.css');
module.exports = React.createClass({
	render(){
		return <div className={Style[this.props.type]||Style.base} onClick={this.clickHandler}>
			{this.props.children}
		</div>
	}
});