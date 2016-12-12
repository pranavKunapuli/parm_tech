var express = require('express');
var app = express();
var uuid = require('node-uuid');
var db = require('./db/queries');
var allThreeWins = require('./routes/allThreeWins');
var mostFinalRoundWins = require('./routes/mostFinalRoundWins');
var leastFinalRoundWins = require('./routes/leastFinalRoundWins');
var noWins = require('./routes/noWins');
var playersOnMostTeams = require('./routes/playersOnMostTeams');
var noFinalsTeams = require('./routes/noFinalsTeams');
var hostedMost = require('./routes/hostedMost');
var hasCountryWonTournament = require('./routes/hasCountryWonTournament');
<<<<<<< HEAD
var howDidCountryDoInYearInTournament = require('./routes/howDidCountryDoInYearInTournament');
var didCountryMakeItToFinalRound = require('./routes/didCountryMakeItToFinalRound');
var countryWinPercentage = require('./routes/countryWinPercentage');
var countryAgainstCountryInTournament = require('./routes/countryAgainstCountryInTournament');
var hasCountryPastGroupStage = require('./routes/hasCountryPastGroupStage');
var whoWasOnTeamInCountry = require('./routes/whoWasOnTeamInCountry');
var whatYearsDidPlayerPlayInTournament = require('./routes/whatYearsDidPlayerPlayInTournament');
var whatCountriesDidPlayerPlayFor = require('./routes/whatCountriesDidPlayerPlayFor');
var whatCountryWonInTournamentInYear = require('./routes/whatCountryWonInTournamentInYear');
var fromWhichCountryIsPlayer = require('./routes/fromWhichCountryIsPlayer');
var howManyTournamentsHasCoachWon = require('./routes/howManyTournamentsHasCoachWon');
var howManyTeamsHasCoachWorkedFor = require('./routes/howManyTeamsHasCoachWorkedFor');

=======
var didCountryMakeItToFinalRound = require('./routes/didCountryMakeItToFinalRound');
var howDidCountryDoInYearInTournament = require('./routes/howDidCountryDoInYearInTournament');
>>>>>>> 2a0c0edaa472b84469585876b92b881f670416ee
// Serve static pages

init_app(app);

app.get('/hasCountryWonTournament', hasCountryWonTournament);
app.get('/didCountryMakeItToFinalRound', didCountryMakeItToFinalRound);
app.get('/howDidCountryDoInYearInTournament', howDidCountryDoInYearInTournament);

app.get('/', function (req, res) {
  res.render('index.jade', {});
});

app.use('/', allThreeWins);
app.use('/', mostFinalRoundWins);
app.use('/', leastFinalRoundWins);
app.use('/', noWins);
app.use('/', playersOnMostTeams);
app.use('/', noFinalsTeams);
app.use('/', hostedMost);
app.use('/', hasCountryWonTournament);
app.use('/', howDidCountryDoInYearInTournament);
app.use('/', didCountryMakeItToFinalRound);
app.use('/', countryWinPercentage);
app.use('/', countryAgainstCountryInTournament);
app.use('/', hasCountryPastGroupStage);
app.use('/', whoWasOnTeamInCountry);
app.use('/', whatYearsDidPlayerPlayInTournament);
app.use('/', whatCountriesDidPlayerPlayFor);
app.use('/', whatCountryWonInTournamentInYear);
app.use('/', fromWhichCountryIsPlayer);
app.use('/', howManyTournamentsHasCoachWon);
app.use('/', howManyTeamsHasCoachWorkedFor);

function init_app() {

	app.set('views',__dirname + '/views');
	app.set('view engine', 'jade');
}

module.exports = app;
