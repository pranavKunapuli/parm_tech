var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/howManyTeamsHasCoachedWorkedFor', function (req, res, next) {
	queries.getfromWhichCountryIsPlayer(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'How many teams/years has ' + req.query.coachName + 'worked for?';
			res.render('coachYears.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;