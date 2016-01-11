var store = require('store');
var config = require('../config.js');


const bigBonus = 'bigBonus';

module.exports = {

	/*获得大奖的名单*/
	getBigBonus: function(){
		var result = store.get(bigBonus);
		if (!result) {
			result = [];
			store.set(bigBonus, result);
		}
		return result;
	},

	/*添加大奖名单*/
	addBigBonus: function(member){
		var result = this.getBigBonus();
		if (result.length==config.bigBonus.count) {
			alert('大奖已经抽完，请不要再抽了！');
			return;
		}
		result.push(member);
	},



};