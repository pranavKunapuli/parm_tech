var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatYearsDidPlayerPlayInTournament', function (req, res, next) {
	var upper = req.query.playerName.toUpperCase();
	queries.getWhatYearsDidPlayerPlayInTournament(upper, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			
			var title = 'What years did player play  ' + req.query.playerName + ' in the ' + req.query.tournamentName + '?';
			console.log(rows);
			res.render('year.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;