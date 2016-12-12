var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/whatYearsDidPlayerPlayInTournament', function (req, res, next) {
	queries.getWhatYearsDidPlayerPlayInTournament(req.query.playerName, req.query.tournamentName, function (err, rows, fields) {
		if (err) {
			next(err);
		} else {
			var title = 'What years did player play  ' + req.query.playerName + ' in the ' + req.query.year + ' ' + req.query.tournamentName + '?';
			res.render('displayPnames.jade', {title: title, results: rows});
		}
	});
});

module.exports = router;