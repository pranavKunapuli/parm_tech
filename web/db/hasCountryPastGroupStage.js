var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hasCountryPastGroupStage', function (req, res, next) {
	var cname = req.query.countryName;
	queries.hasCountryPastGroupStage(function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'Has' + cname + ' ever made it past the group stages in FIFA?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;