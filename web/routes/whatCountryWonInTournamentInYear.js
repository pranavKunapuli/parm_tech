var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatCountryWonInTournamentInYear', function (req, res, next) {
	queries.getWhatCountryWonInTournamentInYear(req.query.tournamentName, req.query.year, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'What country won the ' + req.query.year + ' ' +  req.query.tournamentName + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;