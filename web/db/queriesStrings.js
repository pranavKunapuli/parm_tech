var squel = require('squel');

var allThreeWins = squel.select().from('Competes_In c')
	.field('DISTINCT c.cname')
	.where('c.stage = \'Gold\'')
	.where('c.tname = \'Olympics\'')
	.where('c.cname IN ?', squel.select().from('Competes_In c')
		.field('DISTINCT c.cname')
		.where('c.stage = \'Final\'')
		.where('c.result = \'W\'')
		.where('c.tname = \'FIFA\'')
		.where('c.cname IN ?', squel.select().from('Competes_In c')
			.field('DISTINCT c.cname')
			.where('c.stage = \'Final\'')
			.where('c.result = \'W\'')
			.where('c.tname = \'UEFA\'')))
	.toString();

var mostFinalRoundWins = squel.select().from('Competes_In')
	.field('DISTINCT cname, COUNT(*) AS count')
	.where('result IN (\'W\',\'n\')')
	.where('stage IN (\'Gold\',\'Final\')')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Competes_In')
		.field('COUNT(*)')
		.where('result IN (\'W\',\'n\')')
		.where('stage IN (\'Gold\',\'Final\')')
		.group('cname')
		.order('COUNT(*)', false)
		.limit(1))
	.toString();

var leastFinalRoundWins = squel.select().from('Competes_In')
	.field('DISTINCT cname, COUNT(*) AS count')
	.where('result IN (\'W\',\'n\')')
	.where('stage IN (\'Gold\',\'Final\')')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Competes_In')
		.field('COUNT(*)')
		.where('result IN (\'W\',\'n\')')
		.where('stage IN (\'Gold\',\'Final\')')
		.group('cname')
		.order('COUNT(*)')
		.limit(1))
	.toString();

var noWins = squel.select().from('Country') 
	.field('cname')
	.where('cname NOT IN ?', squel.select().from('Competes_In')
		.field('DISTINCT cname')
		.where('year > 1950')
		.where('stage IN (\'Gold\', \'Final\')')
		.where('result IN (\'W\', \'n\')'))
	.toString();

var playersOnMostTeams = squel.select().from('Plays_For')
	.field('DISTINCT pname, COUNT(*)')
	.group('pname')
	.having('COUNT(*) = ?', squel.select().from('Plays_For')
		.field('COUNT(*)')
		.group('pname')
		.order('COUNT(*)', false)
		.limit(1)
	).toString();

var noFinalsTeams = squel.select().from('Country')
	.field('cname')
	.where('cname NOT IN ?', squel.select().from('Competes_In')
		.field('DISTINCT cname')
		.where('stage IN (\'Final\', \'Gold\', \'Silver\')')
	).toString();

var hostedMost = squel.select().from('Hosts')
	.field('cname, COUNT(*) AS num')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Hosts')
		.field('COUNT(*)')
		.group('cname')
		.order('COUNT(*)', false)
		.limit(1)
	).toString();

var hasCountryWonTournament = function (countryName, tourneyyy) {
	var where1 = 'cname=' + "\'" + countryName + "\'";
	var where2 = 'tname=' + "\'" + tourneyyy + "\'";
	return squel.select().from('Competes_In')
	.field('DISTINCT cname')
	.where(where1)
	.where(where2)
	.where('(stage=\'Final\' AND result=\'W\') OR stage=\'Gold\'').toString();
}   

var howDidCountryDoInYearInTournament = function (countryName, year, tourneyyy) {
	var cname = 'cname = \'' + countryName + '\'';
	var yearString = 'year = ' + year;
	var tname = 'tname = \'' + tourneyyy + '\'';
	console.log(countryName);
	console.log(year);
	console.log(tourneyyy);
	return squel.select().from('Competes_In')
	.field('cname, stage, result, score')
	.where(cname)
	.where(yearString)
	.where(tname).toString();
}

var didCountryMakeItToFinalRound = function (countryName, tourneyyy) {
	var cname = 'cname = \'' + countryName + '\'';
	var tname = 'tname = \'' + tourneyyy + '\'';
	return squel.select().from('Competes_In')
	.field('cname, year, tname')
	.where(cname)
	.where(tname)
	.where('stage IN (\'Final\', \'Gold\', \'Silver\')').toString();
}

var countryWinPercentage = function (countryName, tourneyyy) {
	var cname = 'cname = \'' + countryName + '\'';
	var tname = 'tname = \'' + tourneyyy + '\'';
	var innerQuery = '(' + squel.select().from('Competes_In')
		.field('COUNT(*)')
		.where(cname)
		.where(tname)
		.group('cname, tname').toString() + ')' + 'AS count';
	return squel.select().from('Competes_In')
	.field('COUNT(*) / ' + innerQuery)
	.where(cname)
	.where(tname)
	.where('(stage =\'Final\' AND result=\'W\') OR (stage=\'Gold\')')
	.group('cname, tname').toString();
}

var countryAgainstCountryInTournament = function (countryOne, countryTwo, tourneyyy) {
	var cnameOne = 'C1.cname = \'' + countryOne + '\'';
	var cnameTwo = 'C2.cname = \'' + countryTwo + '\'';
	var whereTname = 'C1.tname = \'' + tourneyyy + '\''; 
	var onJoin = 'Competes_In C2 ON C1.tname=C2.tname AND C1.year=C2.year AND C1.stage=C2.stage';
	return squel.select().from('Competes_In C1')
	.field('C1.cname AS countryOne, C2.cname AS countryTwo, C1.result AS resultOne, C2.result AS resultTwo, C1.score AS score, C1.tname AS tname, C1.year AS year')
	.join(onJoin)
	.where(cnameOne)
	.where(cnameTwo)
	.where(whereTname).toString();
}

var hasCountryPastGroupStage = function (countryName) {
	var cname = 'cname = \'' + countryName + '\'';
	return squel.select().from('Competes_In')
	.field('DISTINCT year')
	.where(cname)
	.where('stage<>\'Group\'')
	.where('tname=\'FIFA\'').toString();
}

var whoWasOnTeamInCountry = function (countryName, tourneyyy, year) {
	var cname = 'P.cname = \'' + countryName + '\'';
	var tname = 'C.tname = \'' + tourneyyy + '\'';
	var year = 'P.year =' + year;
	var onJoin = 'Competes_In C ON P.cname=C.cname AND P.year=C.year';
	return squel.select().from('Plays_For P')
	.field('DISTINCT P.pname AS pname')
	.join(onJoin)
	.where(cname)
	.where(tname)
	.where(year).toString();
}

var whatYearsDidPlayerPlayInTournament = function (player, tourneyyy) {
	var player = 'P.pname = \'' + player + '\'';
	var tname = 'C.tname = \'' + tourneyyy + '\'';
	var joinOn = 'Competes_In C ON P.cname = C.cname AND P.year=C.year';
	return squel.select().from('Plays_For P')
	.field('DISTINCT P.pname AS player, C.year AS year')
	.join(joinOn)
	.where(tname)
	.where(player).toString();
}

var whatCountriesDidPlayerPlayFor = function (player) {
	var player = 'pname = \'' + player + '\'';
	return squel.select().from('Plays_For')
	.field('DISTINCT pname AS Player, cname')
	.where(player).toString();
}

var whatCountryWonInTournamentInYear = function (tourneyyy, year) {
	var tname = 'tname = \'' + tourneyyy + '\'';
	var year = 'year = ' + year;
	var win = '((tname=\'Olympics\' AND stage=\'Gold\') OR (stage=\'Final\' AND result=\'W\'))';
	return squel.select().from('Competes_In')
	.field('tname, year, cname')
	.where(tname)
	.where(year)
	.where(win).toString();
}

var fromWhichCountryIsPlayer = function (player) {
	var player = 'pname = \'' + player + '\'';
	return squel.select().from('Plays_For')
	.field('DISTINCT pname, cname')
	.where(player).toString();
}

var howManyTournamentsHasCoachWon = function (coach) {
	var coach = 'C.coname = \'' + coach + '\'';
	var joinOn = 'Competes_In CI ON C.cname=CI.cname AND C.year=CI.year';
	return squel.select().from('Coaches C')
	.field('C.coname, CI.cname, COUNT(*) as wins')
	.join(joinOn)
	.where(coach)
	.where('((CI.stage=\'Final\' AND CI.result=\'W\') OR (CI.stage=\'Gold\'))')
	.group('C.coname, C.cname').toString();
}

var howManyTeamsHasCoachWorkedFor = function (coach) {
	var coach = 'coname = \'' + coach + '\'';
	return squel.select().from('Coaches')
	.field('coname, cname, COUNT(*) AS years')
	.group('coname, cname')
	.having(coach).toString();
}

module.exports = {
	allThreeWins: allThreeWins,
	mostFinalRoundWins: mostFinalRoundWins,
	leastFinalRoundWins: leastFinalRoundWins,
	playersOnMostTeams: playersOnMostTeams,
	noFinalsTeams: noFinalsTeams,
	hostedMost: hostedMost,
	hasCountryWonTournament: hasCountryWonTournament,
	noWins: noWins,
	howDidCountryDoInYearInTournament:howDidCountryDoInYearInTournament,
	didCountryMakeItToFinalRound: didCountryMakeItToFinalRound,
	countryWinPercentage: countryWinPercentage,
	countryAgainstCountryInTournament: countryAgainstCountryInTournament,
	hasCountryPastGroupStage: hasCountryPastGroupStage,
	whoWasOnTeamInCountry: whoWasOnTeamInCountry,
	whatYearsDidPlayerPlayInTournament: whatYearsDidPlayerPlayInTournament,
	whatCountriesDidPlayerPlayFor: whatCountriesDidPlayerPlayFor,
	whatCountryWonInTournamentInYear: whatCountryWonInTournamentInYear,
	fromWhichCountryIsPlayer: fromWhichCountryIsPlayer,
	howManyTournamentsHasCoachWon: howManyTournamentsHasCoachWon, 
	howManyTeamsHasCoachWorkedFor: howManyTeamsHasCoachWorkedFor
}