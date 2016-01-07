var React = require('react');
function load(componentName) {
	return require('./Component/'+componentName+'/'+componentName+'.js');
}
var Button = load('Button');
module.exports = React.createClass({
	render() {
		return (
			<div className={global.baseStyle.container}>
				<div className={global.baseStyle.topBtnGroup}>
					<Button>抽大奖名单</Button>
					<Button>抽取开心奖</Button>
					<Button>抽超级大奖</Button>
				</div>
			</div>
		);
	}
});