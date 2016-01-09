import React from 'react'

var Button = component('Button')
var FaceButton = component('FaceButton')
var Grid = component('Grid')

var Style = require('./style.css')

module.exports = React.createClass({
	getInitialState() {
		return {
			selected: []
		};
	},
	onSelectFace(value){
		console.log(value);
	},
	cellRender(data){
		return <FaceButton key={data} value={data} onSelected={this.onSelectFace}/>
	},
	componentDidMount() {
		var btns = [];
		for(var i=0,l=104;i<l;i++) {
			btns.push('123');
		}
		this.setState({data:btns});
	},
	render(){
		return (
			<div className={Style.container}>
				<Grid col={13} data={this.state.data} cellRender={this.cellRender} />
				<div className={Style.info}>
					<h1 className={Style.title}>总经理</h1>
					<div className={Style.selectNum}>已选<b>8</b>剩余<b>0</b></div>
					<div className={Style.total}>总计：已选 8 剩余 42</div>
					<Button type="conform">确定</Button>
				</div>
			</div>
		);
	}
});