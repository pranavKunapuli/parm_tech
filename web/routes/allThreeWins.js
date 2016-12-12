var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/allThreeWins', function (req, res, next) {
	queries.getAllThreeWins(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'Teams That Have Won All Three Tournaments';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;