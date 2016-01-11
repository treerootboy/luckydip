var db = require('./DB.js');
var store = require('store');
var config = require('../config.js');

const prepareBigBonus = 'prepareBigBonus';
module.exports = {
	/*打乱可抽大奖的名单并存储*/
	prepareData: function(handler){

		if(store.get(prepareBigBonus)) return;

		db.query("SELECT * FROM member WHERE level = 2", function(result, error, tx){
			error && console.log("Error: " + error.message + " in " + sql);

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

			// 返回打乱后的结果
			handler(result, error);
		});
	}
};