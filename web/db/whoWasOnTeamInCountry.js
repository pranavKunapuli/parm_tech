var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whoWasOnTeamInCountry', function (req, res, next) {
	var cname = req.query.countryName;
	var tname = req.query.tournamentName;
	var year = req.query.year;
	queries.whoWasOnTeamInCountry(cname, tname, year, function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'Who was on the ' + cname + ' team in ' + tname + ', in ' + year + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;