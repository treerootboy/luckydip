var React = require('react');
var Style = require('./style.css');
module.exports = React.createClass({
	getInitialState() {
		return {
			selected: false 
		};
	},
	getDefaultProps() {
		return {
			readonly: false
		};
	},
	clickHandler(e){
		!this.props.readonly && this.setState({selected: !this.state.selected});
		this.props.onSelect && this.props.onSelect(this.state.selected, this.props.value);
	},
	render(){
		return <label className={this.state.selected?Style.selected:Style.base}>
			<input type="checkbox" onChange={this.clickHandler}/>
		</label>
		
	}
});