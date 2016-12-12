var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/howDidCountryDoInYearInTournament', function (req, res, next) {
	queries.getHowDidCountryDoInYearInTournament(req.query.countryName, req.query.year, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'How did ' + req.query.countryName + ' do in year ' + req.query.year + ' ' + req.query.tournamentName + '?';
			res.render('stageResultScore.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;