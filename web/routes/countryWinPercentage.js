var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/countryWinPercentage', function (req, res, next) {
	queries.getCountryWinPercentage(req.query.countryName, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'What is ' + req.query.countryName + '\'s win percentage in the ' + req.query.tournamentName + '?';
			res.render('percentage.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;