import React from 'react'

var Button = component('Button')
var FaceButton = component('FaceButton')
var Grid = component('Grid')
var HappyName = component('HappyName')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data:[] 
    };
  },
  componentDidMount() {
    var btns = [];
    for(var i=0,l=30;i<l;i++) {
      btns.push('123');
    }
    this.setState({data:btns});
  },
  cellRender(data){
    return <HappyName />
  },
  render(){
    return (
      <div>
        <Grid col={6} data={this.state.data} cellRender={this.cellRender} />
      </div>
    );
  }
});