var store = require('store');
var extend = require('object-assign');
var config = require('../config.js').happyBonus;
var db = model('DB');
var Step = model('Step');

const happyBonus = 'happyBonus';
const isPrepare = 'isHappyBonusPrepare';

module.exports = extend(Step(happyBonus), {

	/*准备不能抽大奖名单，满入职不满一年名单及张总、冯副总*/
	prepareData(){
		console.log('准备不能抽大奖名单，满入职不满一年名单及张总、冯副总');
		if(store.get(happyBonus)) return;

		db.query("SELECT * FROM member WHERE level = 1").then((result, tx)=>{
			
			// 检查取出是否与配置一致
			if (result.length != config.initCount) {
				alert('可抽大奖名单人数与配置不一致！');
				return;
			}
			store.set(happyBonus, result);
		});
	},

	/* 抽完名单，轮到下一位抽取 */
	nextStep(){

		console.log(this.getStep().name+' 结束抽奖');

		// 跳到下一轮
		var step = this._getCurrentStepNumber();
		this._setStep(++step);

		// 清除上一轮名单
		this._setCurrentPickPack([]);
		
		if (step.completed) {
			this.setPrepare(3);
			return;
		}

		console.log(this.getStep().name+' 开始抽奖');
	},

	/* 抽取30名 */
	pick(){
		this.checkPrepare();
		this.setPrepare(2);
		var step = this.getStep();
		var list = this.getAll();
		var pickPack = list.filter(v=>{return !v.selected;})
							.sort(function(){return Math.random()*0.5;})
							.slice(0, 30)
							.map(v=>{
								v.selected = true;
								v.step = step.index;
								return v;
							});
		this._setCurrentPickPack(pickPack);
		store.set(happyBonus, list);

		console.log(this.getStep().name+' 抽了'+pickPack.length+'名');

		return pickPack;
	},

	/* 判断开心奖是否有准备好
	   -1：未准备不能抽大奖名单；
	   0：准备好不能抽大奖名单；
	   1：准备好抽奖名单
	   2：已抽过开心奖	
	   3：抽完开心奖	
	*/
	checkPrepare(){
		var status = Number(store.get(isPrepare));
		console.log(status);
		switch(status){
			case 1:
			case 2:
				return;
			case 0:
				alert('请先抽大奖名单');
				throw new Error('请先抽大奖名单');
				break;
			case 3:
				throw new Error('开心奖已抽完！');
			default:
				alert('开心奖名单未准备好！');
				throw new Error('开心奖名单未准备好！');
				break;
		}
	},

	setPrepare(status){
		store.set(isPrepare, status);
	},

	/*开心奖名单*/
	getAll(){
		var result = store.get(happyBonus);
		return result;
	},

	add(list){
		console.log('剩余加入到开心奖', list);
		var result = this.getAll();
		if (result.length===config.count) {
			throw new Error('开心奖名单已经够'+config.count+'名了');
		}
		result = result.concat(list);
		store.set(happyBonus, result);
		this.setPrepare(1);
	}

});