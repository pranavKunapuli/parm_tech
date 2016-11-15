var db = require('./mysql');

var queryAllThreeWins = function (next) {
	db.connect(function() {
		db.getAllThreeWins(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryMostFinalRoundWins = function (next) {
	db.connect(function() {
		db.getMostFinalRoundWins(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryMostFinalRoundWins = function (next) {
	db.connect(function() {
		db.getLeastFinalRoundWins(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryNoWins = function (next) {
	db.connect(function() {
		db.getNoWins(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryPlayersOnMostTeams = function (next) {
	db.connect(function() {
		db.getPlayersOnMostTeams(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryNoFinalsTeams = function (next) {
	db.connect(function() {
		db.getNoFinalsTeams(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

var queryHostedMost = function (next) {
	db.connect(function() {
		db.getHostedMost(function (err, rows, fields) {
			if (err) {
				next(err, null);
			} else {
				next(null, rows, fields);
			}
	    });
	}
)};

module.exports = {
    getAllThreeWins: queryAllThreeWins,
    getMostFinalRoundWins: queryMostFinalRoundWins,
    getLeastFinalRoundWins: queryMostFinalRoundWins,
    getPlayersOnMostTeams: queryPlayersOnMostTeams,
    getNoFinalsTeams: queryNoFinalsTeams,
    getHostedMost: queryHostedMost,
    getNoWins: queryNoWins
}