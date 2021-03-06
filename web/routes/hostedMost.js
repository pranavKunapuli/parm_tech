var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hostedMost', function (req, res, next) {
	queries.getHostedMost(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'Countries that Have Hosted the Most Tournaments';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;