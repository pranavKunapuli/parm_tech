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

var queryHasCountryWonTournament = function (countryName, tournamentName, next) {
	db.connect(function() {
		db.getHasCountryWonTournament(countryName, tournamentName, next);
	}
)};

var queryHowDidCountryDoInYearInTournament = function (countryName, year, tournamentName, next) {
	db.connect(function() {
		db.getHowDidCountryDoInYearInTournament(countryName, year, tournamentName, next);
	}
)};

var queryDidCountryMakeItToFinalRound = function (countryName, tournamentName, next) {
	db.connect(function() {
		db.getDidCountryMakeItToFinalRound(countryName, tournamentName, next);
	}
)};

var queryCountryWinPercentage = function (countryName, tournamentName, next) {
	db.connect(function() {
		db.getCountryWinPercentage(countryName, tournamentName, next);
	}
)};

var queryCountryAgainstCountryInTournament = function (countryNameOne, countryNameTwo, tournamentName, next) {
	db.connect(function() {
		db.getCountryAgainstCountryInTournament(countryNameOne, countryNameTwo, tournamentName, next);
	}
)};

var queryHasCountryPastGroupStage = function (countryName, tournamentName, next) {
	db.connect(function() {
		db.getHasCountryPastGroupStage(countryName, tournamentName, next);
	}
)};

var queryWhoWasOnTeamInCountry = function (countryName, tournamentName, year, next) {
	db.connect(function() {
		db.getWhoWasOnTeamInCountry(countryName, tournamentName, year, next);
	}
)};

var queryWhatYearsDidPlayerPlayInTournament = function (playerName, tournamentName, next) {
	db.connect(function() {
		db.getWhatYearsDidPlayerPlayInTournament(playerName, tournamentName, next);
	}
)};

var queryWhatCountriesDidPlayerPlayFor = function (playerName, next) {
	db.connect(function() {
		db.getWhatCountriesDidPlayerPlayFor(playerName, next);
	}
)};

var queryWhatCountryWonInTournamentInYear = function (tournamentName, year, next) {
	db.connect(function() {
		db.getWhatCountryWonInTournamentInYear(tournamentName, year, next);
	}
)};

var queryFromWhichCountryIsPlayer = function (playerName, next) {
	db.connect(function() {
		db.getFromWhichCountryIsPlayer(playerName, next);
	}
)};

var queryHowManyTournamentsHasCoachWon = function (coachName, next) {
	db.connect(function() {
		db.getHowManyTournamentsHasCoachWon(coachName, next);
	}
)};

var queryHowManyTeamsHasCoachWorkedFor = function (coachName, next) {
	db.connect(function() {
		db.getHowManyTeamsHasCoachWorkedFor(coachName, next);
	}
)};


module.exports = {
    getAllThreeWins: queryAllThreeWins,
    getMostFinalRoundWins: queryMostFinalRoundWins,
    getLeastFinalRoundWins: queryLeastFinalRoundWins,
    getPlayersOnMostTeams: queryPlayersOnMostTeams,
    getNoFinalsTeams: queryNoFinalsTeams,
    getHostedMost: queryHostedMost,
    getHasCountryWonTournament: queryHasCountryWonTournament,
    getHowDidCountryDoInYearInTournament: queryHowDidCountryDoInYearInTournament,
    getDidCountryMakeItToFinalRound: queryDidCountryMakeItToFinalRound,
    getCountryWinPercentage: queryCountryWinPercentage,
    getCountryAgainstCountryInTournament: queryCountryAgainstCountryInTournament,
    getHasCountryPastGroupStage: queryHasCountryPastGroupStage,
    getWhoWasOnTeamInCountry: queryWhoWasOnTeamInCountry,
    getWhatYearsDidPlayerPlayInTournament: queryWhatYearsDidPlayerPlayInTournament,
    getWhatCountriesDidPlayerPlayFor: queryWhatCountriesDidPlayerPlayFor,
    getWhatCountryWonInTournamentInYear: queryWhatCountryWonInTournamentInYear,
    getFromWhichCountryIsPlayer: queryFromWhichCountryIsPlayer,
    getHowManyTournamentsHasCoachWon: queryHowManyTournamentsHasCoachWon,
    getHowManyTeamsHasCoachWorkedFor: queryHowManyTeamsHasCoachWorkedFor,
    getNoWins: queryNoWins
}










