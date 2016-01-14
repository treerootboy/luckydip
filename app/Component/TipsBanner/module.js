import React from 'react-with-addons'
import {TransitionMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render(){
		return <div className={Style.mask}>
			<Motion defaultStyle={{top:-800}} style={{top:spring(100, [150, 9])}}>
			{style => <div style={{top:style.top}} className={Style.banner}>
				<div className={Style.close} onClick={this.props.onClose}>×</div>
				<div className={Style.name}>{this.props.name}</div>
			</div>}
			</Motion>
		</div>
	}
});