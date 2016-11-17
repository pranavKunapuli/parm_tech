var mysql = require('mysql');
var queryStrings = require('./queriesStrings');
//var squel = require('squel');

var state = {
	pool: null
}

var connect = function (done) {
	state.pool = mysql.createPool({
		host: 'cis550project.csukxhkxofbf.us-east-1.rds.amazonaws.com',
		user: 'parmtech', 
		port: 3306,
		password: 'parmtechCIS550',
		database: 'cis550project',
		connectTimeout: 60 * 60 * 1000,
		connectionLimit: 1000,
		acquireTimeout: 60 * 60 * 1000,
		timeout: 60 * 60 * 1000
	});
	done();
}

var get = function () {
	return state.pool;
}

var allThreeWins = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.allThreeWins, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var mostFinalRoundWins = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.mostFinalRoundWins, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var leastFinalRoundWins = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.leastFinalRoundWins, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var noWins = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.noWins, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var playersOnMostTeams = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.playersOnMostTeams, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var noFinalsTeams = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.noFinalsTeams, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var hostedMost = function (done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.hostedMost, function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

module.exports = {
	getAllThreeWins: allThreeWins,
	getMostFinalRoundWins: mostFinalRoundWins,
	getLeastFinalRoundWins: leastFinalRoundWins,
	getPlayersOnMostTeams: playersOnMostTeams,
	getNoWins: noWins,
	getNoFinalsTeams: noFinalsTeams,
	getHostedMost: hostedMost,
	connect: connect,
	get: get
}