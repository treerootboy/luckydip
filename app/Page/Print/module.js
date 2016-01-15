import React from 'react'
import {StaggeredMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var Button = component('Button');
var Grid = component('Grid');
var HappyBonus = model('HappyBonus');

module.exports = React.createClass({
	getInitialState() {
		return {
			data: {},
			index: 0
		};
	},
	componentDidMount() {
		var data = HappyBonus.getAll().filter(v=>{return v.selected && v.step==this.state.index;});
		global.document.body.style.background = 'none';
		this.setState({data: data});
	},
	componentWillUpdate(nextProps, nextState) {
		var data = HappyBonus.getAll()
					.filter(v=>{ return v.selected && v.step==nextState.index; })
					.sort((a,b)=>{ return a.name.localeCompare(b.name); });
		nextState.data = data;
	},
	cellRender(data){
		return <div style={{padding: 10}}>{data.name}</div>;
	},
	print(){
		global.print();
	},
	selectStep(e){
		this.setState({index: Number(e.target.value)});
	},
	render(){
		return (
			<div className={Style.container}>
				<div className={Style.noPrint}>
					<h1>开心奖名单
						<select style={{marginLeft: 100}} onChange={this.selectStep}>
							{([1,2,3]).map(v=>{
								return <option key={v} value={v-1}>第{v}轮</option>
							})}
						</select>
					</h1>
				</div>
				<div style={{minHeight: 200}}>
				<Grid col={6} data={this.state.data} cellRender={this.cellRender}/>
				</div>
				<div style={{width: 200}} className={Style.noPrint}>
					<Button onClick={this.print}>打印</Button>
				</div>
			</div>
		);
	}
});