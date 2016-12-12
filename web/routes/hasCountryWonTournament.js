var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hasCountryWonTournament', function (req, res, next) {
	console.log("here");
	queries.getHasCountryWonTournament(req.query.countryName, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			console.log("here");
			next(err);
		} else {
			var title = 'Has Country X Won Tournament Z?';
			res.render('displayCnames.jade', {title: title, results: rows});
		}
	});
});



module.exports = router;