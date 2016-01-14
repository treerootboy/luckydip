import React from 'react'
import {StaggeredMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var Button = component('Button');
var Grid = component('Grid');
var HappyBonus = model('HappyBonus');

module.exports = React.createClass({
	getInitialState() {
		return {
			step: {
				name: ''
			},
			data: {}
		};
	},
	componentDidMount() {
		var step = HappyBonus.getStep();
		var data = HappyBonus.getAll().filter(v=>{return v.selected && v.step==step.index;});
		global.document.body.style.background = 'none';
		this.setState({step: step, data: data});
	},
	cellRender(data){
		return <div style={{padding: 10}}>{data.name}</div>;
	},
	print(){
		global.print();
	},
	render(){
		return (
			<div className={Style.container}>
				<h3>{this.state.step.name}名单，共{this.state.step.count}名</h3>
				<Grid col={6} data={this.state.data} cellRender={this.cellRender}/>
				<div className={Style.noPrint}>
					<Button onClick={this.print}>打印</Button>
				</div>
			</div>
		);
	}
});