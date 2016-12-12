var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatYearsDidPlayerPlayInTournament', function (req, res, next) {
	var pname = req.query.playerName;
	var tname = req.query.tournamentName;
	var year = req.query.year;
	queries.whatYearsDidPlayerPlayInTournament(pname, tname, year, function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'In what years did ' + pname + ' play in ' + tname + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;