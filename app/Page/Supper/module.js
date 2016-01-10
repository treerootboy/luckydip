import React from 'react'
import {StaggeredMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var Button = component('Button');
var NameBanner = component('NameBanner');
const AnimationStart = true;

module.exports = React.createClass({
	getInitialState() {
		return {
			showNum: "000",
			scrollStep: 0,
			result: false
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
	AnimationCompleted: false,
	onAnimationCompleted(){
		console.log(Date()+'stop');
		this.setState({showName: '黎明'});
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
				return (function(){
					this.AnimationCompleted = false;
					return <StaggeredMotion
						defaultStyles={[{y: 58, delay: 0}, {y: 58, delay: 0}, {y:58, delay: 0}]} 
						styles={prevStyles => prevStyles.map((v, i) => {
							this.stopValue = this.Y(i);
							v.y = spring(this.stopValue, [20, 10]);
							v.delay = i*0.5;
							return v;
						  })}>
						{interpolatedStyles => {
							var y = interpolatedStyles[interpolatedStyles.length-1].y;
							if (!this.AnimationCompleted && this.stopValue==Math.ceil(y)-20) {
								this.AnimationCompleted = true;
								setTimeout(this.onAnimationCompleted, 20);
				      		}

							return <div className={Style.scrollBox}>
						      {interpolatedStyles.map(((style, i) => {
						        	return <div key={i} style={{backgroundPositionY: style.y}} className={Style.scrollNum}></div>
						      }).bind(this))}
						    </div>
						 }}
					</StaggeredMotion>}).bind(this);
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
		this.setState({showNum: "000", scrollStep: 1, result: false});
	},
	stop() {
		this.setState({showNum: "159", scrollStep: 2, result: true});
	},
	close(){
		this.setState({showName:false});
	},
	render(){
		return (
			<div className={Style.container}>
				<div className={Style.bounes}>
					{this.animationStep(this.state.scrollStep)()}
					<div className={Style.scrollStick}></div>
				</div>
				<div className={Style.info}>
					<Button type="BigBase">抽取主管奖</Button><br/><br/>
					{this.state.scrollStep == 1 ?
					<Button type="start" onClick={this.stop}>停止</Button>
					: <Button type="start" onClick={this.start}>开始</Button>}
					<div className={Style.least}>剩余：6</div>
				</div>
				{this.state.showName && <NameBanner name={this.state.showName} onClose={this.close}/>}
			</div>
		);
	}
});