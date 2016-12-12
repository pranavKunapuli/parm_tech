var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/countryAgainstCountryInTournament', function (req, res, next) {
	var cnameOne = req.query.countryNameOne;
	var cnameTwo = req.query.countryNameTwo;
	var tname = req.query.tournamentName;
	queries.countryAgainstCountryInTournament(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'How has ' + cnameOne + ' done against '+ cnameTwo + 'historically in ' + tname + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;