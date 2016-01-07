var React = require('react');
var Style = require('./StationSelector.css');

module.exports = React.createClass({
	listItemOvering: false,
	getInitialState: function() {
		return {
			input: '',
			isFocus: false
		};
	},
	isOvering(isOvering){
		this.listItemOvering = isOvering;
	},
	isFocus(isFocus){
		this.setState({isFocus: this.listItemOvering || isFocus});
	},
	changeHandler(e){
		this.setState({input:e.target.value});
	},
	selectedHandler(data){
		this.setState({input: data.station.name})
		this.props.onSelect(data);
	},
	componentDidUpdate: function(prevProps, prevState) {
		$(this.refs.list).width($(this.refs.input).outerWidth()-2);
		this.state.isFocus && this.refs.list.children.length>1 
			? $(this.refs.list).show() : $(this.refs.list).hide()
	},
	render(){
		return (
			<div className={Style.container}>
				<input ref='input' className={Style.input} value={this.state.input} onChange={this.changeHandler} onFocus={this.isFocus.bind(null, true)} onBlur={this.isFocus.bind(null, false)} placeholder='请输入站点'/>
				<ul ref='list' className={Style.list}>
					{Stations.map((v, i) => {
						if (v.station.name.search(this.state.input)!==-1)
						return <li key={'item_'+i} className={Style.item} onMouseOver={this.isOvering.bind(null, true)} onMouseOut={this.isOvering.bind(null, false)} onClick={this.selectedHandler.bind(null, v)}>{v.station.name}</li>;
					})}
				</ul>
			</div>
		);
	}
});