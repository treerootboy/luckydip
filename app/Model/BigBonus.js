var store = require('store');
var extend = require('object-assign');
var config = require('../config.js').bigBonus;
var Step = model('Step');

const bigBonus = 'bigBonus';
const pickStep = 'bigBonusPickStep';
const pickedBigBonus = 'pickedBigBonus';

module.exports = extend(Step(bigBonus), {

	/*可抽大奖名单*/
	getAll(){
		var result = store.get(bigBonus);
		if (!result) {
			result = [];
			store.set(bigBonus, result);
		}
		return result;
	},

	/*添加大奖名单*/
	add(pickPack){
		var result = this.getAll();
		if (result.length==config.count) {
			throw new Error('大奖已经抽完，请不要再抽了！');
			return;
		}
		result = result.concat(pickPack);
		store.set(bigBonus, result);
	},

	/*获奖名单*/
	getPicked() {
		var result = store.get(pickedBigBonus);
		if (!result) {
			result = [];
			store.set(pickedBigBonus, result);
		}
		return result;
	},

	/*增加获奖名单*/
	addPicked(member){
		var step = this.getStep();
		member.bonus = step.name;
		var result = this.getPicked();
		result.push(member);
		store.set(pickedBigBonus, result);

		console.log(`${member.name} 抽到了 ${member.bonus}`);
	},

	/* 抽完名单，轮到下一位抽取 */
	nextStep(){
		var step = this.getStep();
		var pickPack = this._getCurrentPickPack();
		if (pickPack.length < step.count) {
			return;
		}

		// 跳到下一轮
		var step = this._getCurrentStepNumber();
		this._setStep(++step);

		// 清除上一轮名单
		this._setCurrentPickPack([]);

		if (step.completed) {
			throw new Error('大奖抽完了');
		}

		console.log(this.getStep().name+' 开始抽奖');
	},

	/* 随机取出一名，并更新剩余名单 */
	randomOne(){
		var list = this.getAll();
		var pickList = list.filter(v=>{return !v.use;});
		var index = Math.floor(Math.random()*pickList.length);
		var member = pickList[index];
		member.use = true;
		this.addPicked(member);
		store.set(bigBonus, list);
		return member;
	},

	checkPrepare(){
		// 检查抽奖第一步是否完成
		var list = this.getAll();
		var picked = this.getPicked();
		if (list.length!==config.count && picked.length===0) {
			alert('还没抽完可抽大奖的名单！');
			throw new Error('还没抽完可抽大奖的名单！');
		}
	},

	/* 抽取一名 */
	pick(){
		this.checkPrepare();

		var step = this.getStep();
		var pickPack = this._getCurrentPickPack();

		console.log(`${step.name} 抽 第${pickPack.length}个`);
		
		var member = this.randomOne();
		pickPack.push(member);
		this._setCurrentPickPack(pickPack);

		console.log(`${step.name} 抽到 ${member.id} ${member.name}`);

		return member;
	}
	
});