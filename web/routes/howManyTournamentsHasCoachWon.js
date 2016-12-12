var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/howManyTournamentsHasCoachWon', function (req, res, next) {
	queries.getHowManyTournamentsHasCoachWon(req.query.coachName.toUpperCase(), function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'How many tournaments has ' + req.query.coachName + ' won?';
			res.render('cnameWins.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;