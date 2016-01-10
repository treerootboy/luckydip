var React = require('react');
var Style = require('./style.css');

var Row = React.createClass({
	render(){
		return <div className={Style.Row}>
			{this.props.data.map((v, i)=>{
				return <Cell key={'cell'+i}>{this.props.cellRender(v)}</Cell>
			})}
		</div>;		
	}
});

var Cell = React.createClass({
	render(){
		return <div className={Style.Cell}>
			{this.props.children}
		</div>
	}
});

module.exports = React.createClass({
	getInitialState() {
		return {
			data: [] 
		};
	},
	getDefaultProps() {
		return {
			col: 1,
			data: [],
			cellRender: function(){}
		};
	},
	componentWillReceiveProps: function(nextProps) {
		var rowGroup = [], row = [];
		nextProps.data.map((v, i)=>{
			row.push(v);
			if (row.length==nextProps.col || i==nextProps.data.length-1) {
				rowGroup.push(row);
				row = [];
			}
		});
		this.setState({data: rowGroup});
	},
	render(){
		return <div className={Style.Grid}>
			{this.state.data.map((v, i)=>{
				return <Row key={'row'+i} col={this.props.col} data={v} cellRender={this.props.cellRender} />;
			})}
		</div>
	}
});