import React from 'react'

var Button = component('Button')
var FaceButton = component('FaceButton')
var Grid = component('Grid')
var HappyName = component('HappyName')
var HappyBonus = model('HappyBonus');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data:[],
      step: {
        name: '',
        count: 0
      },
      show: false
    };
  },
  componentDidMount() {
    var data = HappyBonus.getCurrentPickPack();
    var step = HappyBonus.getStep();
    if (data.length==0) {
      for(var i=0;i<30;i++) {
        data.push(i);
      }
    }
    if (step.completed) data = [];
    this.setState({data:data, step: HappyBonus.getStep()});
  },
  cellRender(data){
    return <HappyName show={this.state.show}>{data.name}</HappyName>
  },
  getHappy(){
    var step = HappyBonus.getStep();
    if (step.completed) return;
    var data = HappyBonus.getCurrentPickPack();
    this.setState({data: data, show: true});
  },
  print(){
    global.print();
  },
  next(){
    HappyBonus.pick();
    HappyBonus.nextStep();
    this.setState({show: false, step: HappyBonus.getStep()});
  },
  render(){
    return (
      <div>
        <Grid col={6} data={this.state.data} cellRender={this.cellRender} />
        {this.state.data.length==0 ? <div style={{height: 200}}></div> : ''}
        {this.state.show ? <div style={{textAlign:'center'}}>
            <Button type="happy" onClick={this.print}>打印</Button>
            <Button type="happy" onClick={this.next}>下一轮</Button>
          </div> :
        <div style={{textAlign:'center'}}><Button type="happy" onClick={this.getHappy}>{this.state.step.name}</Button></div>}
      </div>
    );
  }
});