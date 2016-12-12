var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whoWasOnTeamInCountry', function (req, res, next) {
	queries.getWhoWasOnTeamInCountry(req.query.countryName, req.query.tournamentName, req.query.year, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Who was on Team ' + req.query.countryNameOne + ' in the ' + req.query.year + ' ' + req.query.tournamentName + '?';
			res.render('displayPnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;