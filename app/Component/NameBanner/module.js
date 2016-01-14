import React from 'react-with-addons'
import {TransitionMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var duang = require('url!../../Resource/sound/duang.mp3');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render(){
		return <div className={Style.mask}>
			<audio autoPlay src={duang}></audio>
			<Motion defaultStyle={{top:-800}} style={{top:spring(60, [150, 9])}}>
			{style => <div style={{top:style.top}} className={Style.banner}>
				<div className={Style.close} onClick={this.props.onClose}>×</div>
				<div className={Style.name}>{this.props.name}</div>
			</div>}
			</Motion>
		</div>
	}
});