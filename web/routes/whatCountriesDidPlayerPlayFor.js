var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatCountriesDidPlayerPlayFor', function (req, res, next) {
	queries.getWhatCountriesDidPlayerPlayFor(req.query.playerName.toUpperCase(), function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'What countries did ' + req.query.playerName + ' play for?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;