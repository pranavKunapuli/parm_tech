var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/countryAgainstCountryInTournament', function (req, res, next) {
	queries.getCountryAgainstCountryInTournament(req.query.countryNameOne, req.query.countryNameTwo, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'How did ' + req.query.countryNameOne + ' do against ' + req.query.countryNameTwo + ' in ' + req.query.tournamentName + '?';
			res.render('compareCountries.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;