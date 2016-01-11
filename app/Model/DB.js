var sql = require('../Resource/db.sql');
var dbName = 'mydb';
module.exports = {
	db: null,
	instance(){
		if(!this.db) this.db = global.openDatabase(dbName, '1.0', 'my first database', 2 * 1024 * 1024);
		return this.db;
	},
	initSql(tx, sql){
		sql.split(';\n').map((l)=>{
			tx.executeSql(l, [], function(){}, function(a, e){console.log(l, e);});
		});
		tx.executeSql('UPDATE member SET level = 2 WHERE month >= 12');
		tx.executeSql('UPDATE member SET level = 1 WHERE name in ("张伟", "冯海云") OR month<12');
		tx.executeSql('UPDATE member SET level = 0 WHERE month <2');
	},
	initDB(){
		this.instance().transaction((tx=>{
			tx.executeSql('SELECT * FROM member', [], ((tx, result)=>{
				if (results.rows.length !== 145) {
					this.initSql(tx, sql);
				}
			}).bind(this), ((tx, error)=>{
				this.initSql(tx, sql);
			}).bind(this));
		}).bind(this));
	},
	/**
	 * 请求sql
	 * DB.query();
	 */
	query(sql, param, handler){
		if (param instanceof Function) {
			handler = param;
			param = [];
		}
		this.instance().transaction(function (tx) {
			tx.executeSql(sql, param, function(tx, result){
				var data = [];
				for(var i=0; i<result.rows.length; i++) {
					data[i] = result.rows.item(i);
				}
				handler(data, null, tx);
			}, function(tx, error){
				handler(null, error, tx);
			});
		});
	}
}