import React from 'react-with-addons'
import {TransitionMotion, Motion, spring, presets} from 'react-motion'

var Style = require('./style.css')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
	render(){
		return <div className={Style.mask}>
			<div className={Style.banner}>
				<div className={Style.close} onClick={this.props.onClose}>×</div>
				<div className={Style.name}>{this.props.name}</div>
			</div>
		</div>
	}
});