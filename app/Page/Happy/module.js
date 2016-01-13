import React from 'react'

var Button = component('Button')
var FaceButton = component('FaceButton')
var Grid = component('Grid')
var HappyName = component('HappyName')
var HappyBonus = model('HappyBonus');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: new Array(30),
      step: {
        name: '',
        count: 0
      },
      show: 0
    };
  },
  componentDidMount() {
    var step = HappyBonus.getStep();
    var data = HappyBonus.getCurrentPickPack();
    if (step.index==0) data = (function(){var d=[];for(var i=0;i<30;i++){d[i]=i;}return d;})();
    if (step.completed) data = [];
    this.setState({data:data, step: step});
  },
  cellRender(data){
    return <HappyName show={data.show}>{data.name}</HappyName>
  },
  getHappy(){
    var step = HappyBonus.getStep();
    if (step.completed) return;
    if (step.index == 0){

      HappyBonus.pick();
    }
    var data = HappyBonus.getCurrentPickPack();
    console.log(data);
    this.show(data);
  },
  show(data){
    setTimeout((function(){
      var l = data.filter(v=>{return !v.show;}).length;
      if (l>0){
        data[data.length-l].show = true;
        this.setState({data:data});
        this.show(data);
      } else {
        this.setState({show:true});
      }
    }).bind(this), 800);
  },
  print(){
    global.print();
  },
  next(){
    HappyBonus.nextStep();
    HappyBonus.pick();
    var data = HappyBonus.getCurrentPickPack();
    this.setState({show: false, data: data, step: HappyBonus.getStep()});
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