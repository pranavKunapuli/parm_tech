var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/mostFinalRoundWins', function (req, res, next) {
	queries.getMostFinalRoundWins(function (err, rows) {
		console.log(err);
		if (err) {
			next(err);
		} else {
			var title = 'Teams With The Most Tournaments';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;