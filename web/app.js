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
// Serve static pages
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/', allThreeWins);
app.use('/', mostFinalRoundWins);
app.use('/', leastFinalRoundWins);
app.use('/', noWins);
app.use('/', playersOnMostTeams);
app.use('/', noFinalsTeams);
app.use('/', hostedMost);

module.exports = app;
