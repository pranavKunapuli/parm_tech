var db = require('./mysql');

var queryAllThreeWins = function (next) {
	db.connect(function() {
		db.getAllThreeWins(next);
	}
)};

var queryMostFinalRoundWins = function (next) {
	db.connect(function() {
		db.getMostFinalRoundWins(next);
	}
)};

var queryLeastFinalRoundWins = function (next) {
	db.connect(function() {
		db.getLeastFinalRoundWins(next);
	}
)};

var queryNoWins = function (next) {
	db.connect(function() {
		db.getNoWins(next);
	}
)};

var queryPlayersOnMostTeams = function (next) {
	db.connect(function() {
		db.getPlayersOnMostTeams(next);
	}
)};

var queryNoFinalsTeams = function (next) {
	db.connect(function() {
		db.getNoFinalsTeams(next);
	}
)};

var queryHostedMost = function (next) {
	db.connect(function() {
		db.getHostedMost(next);
	}
)};

module.exports = {
    getAllThreeWins: queryAllThreeWins,
    getMostFinalRoundWins: queryMostFinalRoundWins,
    getLeastFinalRoundWins: queryLeastFinalRoundWins,
    getPlayersOnMostTeams: queryPlayersOnMostTeams,
    getNoFinalsTeams: queryNoFinalsTeams,
    getHostedMost: queryHostedMost,
    getNoWins: queryNoWins
}