var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/hasCountryWonTournament', function (req, res, next) {
	console.log("made it to router")
	queries.getHasCountryWonTournament(req.query.countryName, req.query.tournamentName, function (err, rows, fields) {
		console.log('Made the query')
		if (err) {
			next(err);
		} else {
			var title = 'Has Country ' + req.query.countryName + ' Won Tournament ' + req.query.tournamentName + '?';
			var json = {};
			if (rows.length != 0) {
				console.log("yes")
				json = 'yes';
			} else {
				console.log("no")
				json = 'no';
			}
			res.render('trueFalse.jade', {title: title, results: json});
		}
	});
});


module.exports = router;