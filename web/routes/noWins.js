var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/noWinsSince1950', function (req, res, next) {
	queries.getNoWins(function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Teams Active Since 1950 that Have Not Won Any Tournaments';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;