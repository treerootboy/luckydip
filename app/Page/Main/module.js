import { Router, Route, Link } from 'react-router'
import React from 'react'

var Button = component('Button');

module.exports = React.createClass({
	render() {
		return (
			<div>
				<div className={global.baseStyle.container}>
					<div className={global.baseStyle.topBtnGroup}>
						<Button><Link to="/">抽大奖名单</Link></Button>
						<Button><Link to="/happy">抽取开心奖</Link></Button>
						<Button><Link to="/supper">开奖</Link></Button>
					</div>
				</div>
				{this.props.children}
			</div>
		);
	}
});