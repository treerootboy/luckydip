var store = require('store');


module.exports = function(model){
	var pickStep = `${model}_pickStep`;
	var currentPickPack = `${model}_currentPickPack`;
	var config = require('../config.js')[model];
	return {
		config: config,

		/* 获取当前抽奖人 */
		getStep(){
			var step = config.lottery[this._getCurrentStepNumber()];
			if (!step) {
				return {name:'已抽完！', count:0, completed: true}
			}
			return step;
		},

		_setStep(step){
			store.set(pickStep, step);
		},
		
		_getCurrentStepNumber(){
			var step = store.get(pickStep);
			if (typeof step !== 'number') {
				step = 0;
				store.set(pickStep, step);
			}
			return step;
		},

		_getNextStep(){
			var step = this._getCurrentStepNumber();
			return config.lottery[step++];
		},

		getCurrentPickPack: function(){
			return this._getCurrentPickPack();
		},

		_getCurrentPickPack(){
			var pickPack = store.get(currentPickPack);
			if (!pickPack || !(pickPack instanceof Array)) {
				pickPack = [];
				store.set(currentPickPack, pickPack);
			}
			return pickPack;
		},

		_setCurrentPickPack(data){
			store.set(currentPickPack, data);
		}
	}
}