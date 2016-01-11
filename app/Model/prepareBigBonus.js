var db = require('./DB.js');
var store = require('store');
var config = require('../config.js');

const prepareBigBonus = 'prepareBigBonus';
module.exports = {
	/*打乱可抽大奖的名单并存储*/
	prepareData(){

		if(store.get(prepareBigBonus)) return;

		db.query("SELECT * FROM member WHERE level = 2").then((result, tx)=>{
			// 检查取出是否与配置一致
			if (result.length !== config.prepareBigBonus.count) {
				alert('可抽大奖名单人数与配置不一致！');
				return;
			}

			// 打乱，
			for(var i=0;i<5;i++) {
				result.sort(function(){ return 0.5 - Math.random() });
			}
			store.set(prepareBigBonus, result);
		});
	},

	getAll(){
		return store.get(prepareBigBonus);
	}
};