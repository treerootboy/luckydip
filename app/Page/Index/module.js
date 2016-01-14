import React from 'react'

var Button = component('Button')
var FaceButton = component('FaceButton')
var Grid = component('Grid')
var PrepareBigBonus = model('PrepareBigBonus');
var BigBonus = model('BigBonus');
var selectedAduio = require('url!../../Resource/sound/select.mp3');
var wrongAduio = require('url!../../Resource/sound/wrong.mp3');

var Style = require('./style.css')

module.exports = React.createClass({
	getInitialState() {
		return {
			step: {
				name: '',
				picked: '',
				leave: ''
			},
			total: {
				picked: '',
				leave: ''
			}
		};
	},
	cellRender(data){
		return <FaceButton key={data} value={data} selected={data.selected} onSelect={this.onSelectFace}/>
	},
	componentDidMount() {
		this.updateStep();
	},

	updateStep(){
		var pickPack = PrepareBigBonus.getCurrentPickPack()
		var step = PrepareBigBonus.getStep();

		console.log(PrepareBigBonus._getCurrentStepNumber());
		
		step.picked = pickPack.length;
		step.leave = step.count - step.picked;
		var total = {
			picked:  BigBonus.getAll().length + pickPack.length
		};
		total.leave = BigBonus.config.count - total.picked;
		var data = PrepareBigBonus.getAll();
		this.setState({data: data, step: step, total: total});
	},

	onSelectFace(selected, value){
		global.wrong = this.refs.wrong;
		try{
			selected ? PrepareBigBonus.unpick(value.index) : PrepareBigBonus.pick(value.index);
		} catch(e) {
			this.refs.wrong.pause();
			this.refs.wrong.play();
			throw e;
		}
		this.refs.select.pause();
		this.refs.select.play();
		this.updateStep();
		return true;
	},

	onConfirm(){
		PrepareBigBonus.nextStep();
		this.updateStep();
	},

	render(){
		return (
			<div className={global.baseStyle.body}>
				<div className={Style.container}>
					<Grid col={13} data={this.state.data} cellRender={this.cellRender} />
					<div className={Style.info}>
						<h1 className={Style.title}>{this.state.step.name}</h1>
						<div className={Style.selectNum}>剩余<b>{this.state.step.leave}</b></div>
						<div className={Style.total}>总计：已选 {this.state.total.picked} 剩余 {this.state.total.leave}</div>
						<Button type="conform" onClick={this.onConfirm}>确定</Button>
					</div>
				</div>
				<audio ref="wrong"/>
				<audio ref="select"/>
			</div>
		);
	}
});