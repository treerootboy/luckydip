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
			readonly: false,
			selected: false
		};
	},
	componentDidMount() {
		this.setState({selected: this.props.selected});
	},
	clickHandler(e){
		if(this.props.onSelect){
			if(!this.props.onSelect(this.state.selected, this.props.value))return;
		}
		this.setState({selected: !this.state.selected});
	},
	render(){
		return <label className={this.state.selected?Style.selected:Style.base}>
			<input type="checkbox" onChange={this.clickHandler}/>
		</label>
		
	}
});