var React = require('react');
var Style = require('./Button.css');
module.exports = React.createClass({
	clickHandler(){
		!this.props.readonly && this.setState(!this.state.selected); 
	},
	render(){
		return <div className={Style[this.state.selected]?Style.base:Style.active} onClick={this.clickHandler}>
			{this.props.children}
		</div>
	}
});