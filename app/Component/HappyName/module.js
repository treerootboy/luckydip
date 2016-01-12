import React from 'react-with-addons'
import {TransitionMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render(){
		return <div className={[Style.container, 'print'].join(' ')}>
			   	<Motion defaultStyle={{val: 0}} style={{val:this.props.show?spring(200):0}}>
			   		{current => {
			   			const {val} = current;
			   			let style = {
			   				left: val
			   			}
			   			return <div key="mask" style={style} className={Style.mask}></div>;
			   		}}
				</Motion>
				<div key="text" className={Style.name}>{this.props.children}</div>
		</div>
	}
});