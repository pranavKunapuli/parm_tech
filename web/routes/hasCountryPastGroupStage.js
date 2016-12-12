var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hasCountryPastGroupStage', function (req, res, next) {
	queries.getHasCountryPastGroupStage(req.query.countryName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Has ' + req.query.countryNameOne + ' past the group stage in FIFA?';
			res.render('year.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;