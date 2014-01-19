/**
 * Created by enix@foxmail.com on 14-1-19.
 */


	var mongodb = require('mongodb'),
		server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});

	exports.db = function () {
		return new mongodb.Db('mongo-test',server,{safe:true});
	};
	exports.mongodb = mongodb;