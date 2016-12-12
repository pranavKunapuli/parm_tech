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
var didCountryMakeItToFinalRound = require('./routes/didCountryMakeItToFinalRound');
var howDidCountryDoInYearInTournament = require('./routes/howDidCountryDoInYearInTournament');
// Serve static pages

init_app(app);

app.get('/hasCountryWonTournament', hasCountryWonTournament);

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


function init_app() {

	app.set('views',__dirname + '/views');
	app.set('view engine', 'jade');
}

module.exports = app;
