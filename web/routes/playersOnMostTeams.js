var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/playersOnMostTeams', function (req, res, next) {
	queries.getPlayersOnMostTeams(function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Players Who Have Played On the Most Teams';
			res.render('displayPnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;