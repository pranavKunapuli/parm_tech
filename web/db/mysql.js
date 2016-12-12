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

var hasCountryWonTournament = function (countryName, tourneyyy, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.hasCountryWonTournament(countryName, tourneyyy), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var howDidCountryDoInYearInTournament = function (countryName, year, tourneyyy, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(countryName + " " +  year + " " + tourneyyy);
	console.log(queryStrings.howDidCountryDoInYearInTournament)
	var queries = pool.query(queryStrings.howDidCountryDoInYearInTournament(countryName, year, tourneyyy), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var didCountryMakeItToFinalRound = function (countryName, tournamentName, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.didCountryMakeItToFinalRound(countryName, tournamentName), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var countryWinPercentage = function (countryName, tourneyyy, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(queryStrings.countryWinPercentage(countryName, tourneyyy))
	var queries = pool.query(queryStrings.countryWinPercentage(countryName, tourneyyy), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var countryAgainstCountryInTournament = function (countryNameOne, countryNameTwo, tourneyyy, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(queryStrings.countryAgainstCountryInTournament(countryNameOne, countryNameTwo, tourneyyy))
	var queries = pool.query(queryStrings.countryAgainstCountryInTournament(countryNameOne, countryNameTwo, tourneyyy), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var hasCountryPastGroupStage = function (countryName, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.hasCountryPastGroupStage(countryName), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var whoWasOnTeamInCountry = function (countryName, tourneyyy, year, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.whoWasOnTeamInCountry(countryName, tourneyyy, year), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var whatYearsDidPlayerPlayInTournament = function (playerName, tourneyyy, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(queryStrings.whatYearsDidPlayerPlayInTournament(playerName, tourneyyy));
	var queries = pool.query(queryStrings.whatYearsDidPlayerPlayInTournament(playerName, tourneyyy), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var whatCountriesDidPlayerPlayFor = function (playerName, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(queryStrings.whatCountriesDidPlayerPlayFor(playerName));
	var queries = pool.query(queryStrings.whatCountriesDidPlayerPlayFor(playerName), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var whatCountryWonInTournamentInYear = function (tourneyyy, year, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.whatCountryWonInTournamentInYear(tourneyyy, year), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var fromWhichCountryIsPlayer = function (playerName, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.fromWhichCountryIsPlayer(playerName), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var howManyTournamentsHasCoachWon = function (coach, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	console.log(queryStrings.howManyTournamentsHasCoachWon(coach))
	var queries = pool.query(queryStrings.howManyTournamentsHasCoachWon(coach), function (err, rows, fields) {
		if (err) {
			done(err);
		} else {
			done(null, rows);
		}
	});
}

var howManyTeamsHasCoachWorkedFor = function (coach, done) {
	var pool = state.pool; 
	if (!pool) return done("Missing database connection.");
	var queries = pool.query(queryStrings.howManyTeamsHasCoachWorkedFor(coach), function (err, rows, fields) {
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
	getHasCountryWonTournament: hasCountryWonTournament,
	getHowDidCountryDoInYearInTournament: howDidCountryDoInYearInTournament,
	getDidCountryMakeItToFinalRound: didCountryMakeItToFinalRound,
	getCountryWinPercentage: countryWinPercentage,
	getCountryAgainstCountryInTournament: countryAgainstCountryInTournament,
	getHasCountryPastGroupStage: hasCountryPastGroupStage,
	getWhoWasOnTeamInCountry: whoWasOnTeamInCountry,
	getWhatYearsDidPlayerPlayInTournament: whatYearsDidPlayerPlayInTournament,
	getWhatCountriesDidPlayersPlayFor: whatCountriesDidPlayerPlayFor,
	getWhatCountryWonInTournamentInYear: whatCountryWonInTournamentInYear,
	getFromWhichCountryIsPlayer: fromWhichCountryIsPlayer,
	getHowManyTournamentsHasCoachWon: howManyTournamentsHasCoachWon,
	getHowManyTeamsHasCoachWorkedFor: howManyTeamsHasCoachWorkedFor,
	connect: connect,
	get: get
}

