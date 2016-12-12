var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatCountriesDidPlayerPlayFor', function (req, res, next) {
	var pname = req.query.playerName;
	queries.whatCountriesDidPlayerPlayFor(pname, function (err, rows) {
		if (err) {
			next(err);
		} else {
			var title = 'What country(ies) did ' + pname + ' play for?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;