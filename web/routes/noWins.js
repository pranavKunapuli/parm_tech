var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/noWinsSince1950', function (req, res, next) {
	queries.getNoWins(function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			res.send(rows, fields);
		}
	});
});

module.exports = router;