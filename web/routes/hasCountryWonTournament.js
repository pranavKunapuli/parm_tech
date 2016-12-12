var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hasCountryWonTournament', function (req, res, next) {
	queries.getHasCountryWonTournament(req.query.countryName, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'Has Country X Won Tournament Z?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});


module.exports = router;