var store = require('store');
var extend = require('object-assign');
var config = require('../config.js').prepareBigBonus;
var db = model('DB');
var BigBonus = model('BigBonus');
var HappyBonus = model('HappyBonus');
var Step = model('Step');

const prepareBigBonus = 'prepareBigBonus';
const pickStep = 'prepareBigBonusPickStep';
const prepareBigBonusOrg = 'prepareBigBonusOrg';

module.exports = extend(Step(prepareBigBonus), {

	/*准备抽大奖名单并打乱，满入职一年名单*/
	prepareData(){
		console.log("准备抽大奖名单并打乱，满入职一年名单");
		if(store.get(prepareBigBonus)) return;

		db.query("SELECT * FROM member WHERE level = 2").then((result, tx)=>{

			// 检查取出是否与配置一致
			if (result.length !== config.count) {
				alert('可抽大奖名单人数与配置不一致！');
				return;
			}

			// 打乱5次
			for(var i=0;i<5;i++) {
				result.sort(function(){ return 0.5 - Math.random() });
			}

			result = result.map((v,i)=>{v.index = i;v.selected = false; return v;})
			store.set(prepareBigBonus, result);

			HappyBonus.setPrepare(0);
		});
	},

	getAll(){
		return store.get(prepareBigBonus);
	},

	/* 抽完名单，轮到下一位抽取 */
	nextStep(){
		var step = this.getStep();
		var pickPack = this._getCurrentPickPack();
		if (pickPack.length < step.count) {
			throw new Error(`${step.name}还没抽够${step.count}名！`);
		}

		console.log(this.getStep().name+' 结束抽奖');

		// 将上一轮名单加入大奖名单
		BigBonus.add(this._getCurrentPickPack());

		// 跳到下一轮
		var step = this._getCurrentStepNumber();
		this._setStep(++step);

		// 清除上一轮名单
		this._setCurrentPickPack([]);

		if (this.getStep().completed) {
			HappyBonus.add(this.getAll().filter(function(v){return !v.selected;}));
			return;
		}

		console.log(this.getStep().name+' 开始抽奖');
	},

	/* 抽取一名 */
	pick(index){
		var step = this.getStep();
		var pickPack = this._getCurrentPickPack();
		if (pickPack.length === step.count) {
			throw new Error(`${step.name}已抽够${step.count}名！`);
		}

		var list = this.getAll();
		list[index].selected = true;
		pickPack.push(list[index]);
		store.set(prepareBigBonus, list);

		this._setCurrentPickPack(pickPack);

		console.log(`${step.name} 抽 第${pickPack.length}个`);
	},

	unpick(index){
		var step = this.getStep();
		var pickPack = this._getCurrentPickPack();
		
		var pickPackIndex = pickPack.findIndex(v=>{return v.index == index});
		
		if (pickPackIndex===-1) throw new Error(`${index}不是${step.name}选的，不能反选`);

		var list = this.getAll();
		list[index].selected = false;
		
		store.set(prepareBigBonus, list);

		pickPack.splice(pickPackIndex, 1);
		this._setCurrentPickPack(pickPack);

		console.log(`${step.name} 取消了 ${index}号`);
	}
});