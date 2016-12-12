var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/fromWhichCountryIsPlayer', function (req, res, next) {
	queries.getfromWhichCountryIsPlayer(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'From which country is ' + req.query.playerName + '?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;