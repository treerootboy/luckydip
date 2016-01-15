import React from 'react'
import {StaggeredMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var Button = component('Button');
var NameBanner = component('NameBanner');
var BigBonus = model('BigBonus');
var startAudio = require('../../Resource/sound/start.mp3');
const AnimationStart = true;

var AnimationCompleted = true;

module.exports = React.createClass({
	getInitialState() {
		return {
			showNum: "000",
			scrollStep: 0,
			result: false,
			bonusName: '',
			showName: false,
			step: {
		        name: '',
		        count: 0
		    }
		};
	},
	Y(i) {
		var num = Number(this.state.showNum[i]);
		return 58-190*(num+10);
	},
	Y(i) {
		var num = Number(this.state.showNum[i]);
		return 58-190*(/*要显示的数字*/num+/*根据位数再加1圈*/i*10+/*至少转50圈*/50);
	},
	AnimationCompleted: true,
	onAnimationCompleted(){
		this.AnimationCompleted = true;
		this.setState({showName: true});
	},
	animationStep(step){
		switch(step) {
			case 1:
				return (function(){
					return <div className={Style.scrollBox}>
						{this.state.showNum.split('').map((v,i)=>{
							return <div key={i} className={[Style.scrollNum, Style.scrollAnimate].join(' ')}></div>
						})}
				    </div>
				}).bind(this);
			case 2:
				var self = this;
				return (function(){
					return <StaggeredMotion
						defaultStyles={[{y: 58, delay: 0}, {y: 58, delay: 0}, {y:58, delay: 0}]} 
						styles={prevStyles => prevStyles.map((v, i) => {
							self.stopValue = self.Y(i);
							v.y = spring(self.stopValue, [20, 10]);
							v.delay = i*0.5;
							return v;
						  })}>
						{interpolatedStyles => {
							var y = interpolatedStyles[interpolatedStyles.length-1].y;
							if (!AnimationCompleted && self.stopValue==Math.ceil(y)-20) {
								AnimationCompleted = true;
								setTimeout(self.onAnimationCompleted, 100);
				      		}

							return <div className={Style.scrollBox}>
						      {interpolatedStyles.map((style, i) => {
						        	return <div key={i} style={{backgroundPositionY: style.y}} className={Style.scrollNum}></div>
						      })}
						    </div>
						 }}
					</StaggeredMotion>});
			default:
				return (function(){
					return <div className={Style.scrollBox}>
						{this.state.showNum.split('').map((v,i)=>{
							return <div key={i} className={Style.scrollNum}></div>
						})}
					</div>
				}).bind(this);
		};
	},
	start() {
		var step = BigBonus.getStep();
		if (!this.AnimationCompleted || step.completed) return;
		BigBonus.checkPrepare();
		this.AnimationCompleted = false;
		this.setState({bonusName: '', showNum: "000", scrollStep: 1, result: false, showName:false});
	},
	stop() {
		var member = BigBonus.pick();
		this.setState({bonusName: member.name, showNum: member.id, scrollStep: 2, result: true, showName:false});
		AnimationCompleted = false;
	},
	close(){
		BigBonus.nextStep();
		this.setState({showName:false});
	},
	componentDidMount() {
		BigBonus.nextStep();
		var step = BigBonus.getStep();
		var pickPack = BigBonus.getCurrentPickPack();
		step.leave = step.count - pickPack.length;
		this.setState({step:step});
	},
	componentWillUpdate(nextProps, nextState) {
		var step = BigBonus.getStep();
		var pickPack = BigBonus.getCurrentPickPack();
		step.leave = step.count - pickPack.length;
		nextState.step = step;
	},
	render(){
		return (
			<div style={this.state.showName?{position: 'relative', zIndex: 100}:{}} className={global.baseStyle.body}>
			<div className={Style.container}>
				<div className={Style.bounes}>
					{this.animationStep(this.state.scrollStep)()}
					<div className={Style.scrollStick}></div>
				</div>
				<div className={Style.info}>
					<Button type="BigBase">{this.state.step.name}</Button><br/><br/>
					{this.state.scrollStep == 1 ?
					<Button type="start" onClick={this.stop}>STOP</Button>
					: <Button type="start" onClick={this.start}>GO</Button>}
					<div className={Style.least}>剩余：{this.state.step.leave}</div>
				</div>
				{this.state.showName && <NameBanner name={this.state.bonusName} onClose={this.close}/>}
			</div>
			{!this.AnimationCompleted && <audio loop autoPlay src={startAudio}></audio>}
			</div>
		);
	}
});