var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatCountryWonInTournamentInYear', function (req, res, next) {
	var tname = req.query.tournamentName;
	var year = req.query.year;
	queries.whatCountryWonInTournamentInYear(tname, year, function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'What country won ' + tname + ' in ' + year + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;