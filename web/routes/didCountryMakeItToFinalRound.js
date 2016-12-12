var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/didCountryMakeItToFinalRound', function (req, res, next) {
	queries.getDidCountryMakeItToFinalRound(req.query.countryName, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Did ' + req.query.countryName + ' make it to a final round in ' + req.query.tournamentName + '?';
			var json = {};
			if (rows.length == 0) {
				json = {result: false}
			} else {
				json = {result: true}
			}
			res.render('trueFalse.jade', {title: title, results: json);
		}
	});
});

module.exports = router;