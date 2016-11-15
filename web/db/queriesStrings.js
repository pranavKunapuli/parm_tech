var squel = require('squel');

var allThreeWins = squel.select().from('Competes_In c')
	.field('DISTINCT c.cname')
	.where('c.stage = \'Gold\'')
	.where('c.tname = \'Olympics\'')
	.where('c.cname IN ?', squel.select().from('Competes_In c')
		.field('DISTINCT c.cname')
		.where('c.stage = \'Final\'')
		.where('c.result = \'W\'')
		.where('c.tname = \'FIFA\'')
		.where('c.cname IN ?', squel.select().from('Competes_In c')
			.field('DISTINCT c.cname')
			.where('c.stage = \'Final\'')
			.where('c.result = \'W\'')
			.where('c.tname = \'UEFA\'')))
	.toString();

var mostFinalRoundWins = squel.select().from('Competes_In')
	.field('DISTINCT cname, COUNT(*)')
	.where('result IN (\'W\',\'n\')')
	.where('stage IN (\'Gold\',\'Final\')')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Competes_In')
		.field('COUNT(*)')
		.where('result IN (\'W\',\'n\')')
		.where('stage IN (\'Gold\',\'Final\')')
		.group('cname')
		.order('COUNT(*)', false)
		.limit(1))
	.toString();

var leastFinalRoundWins = squel.select().from('Competes_In')
	.field('DISTINCT cname, COUNT(*)')
	.where('result IN (\'W\',\'n\')')
	.where('stage IN (\'Gold\',\'Final\')')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Competes_In')
		.field('COUNT(*)')
		.where('result IN (\'W\',\'n\')')
		.where('stage IN (\'Gold\',\'Final\')')
		.group('cname')
		.order('COUNT(*)')
		.limit(1))
	.toString();

var noWins = squel.select().from('Country') 
	.field('cname')
	.where('cname NOT IN ?', squel.select().from('Competes_In')
		.field('DISTINCT cname')
		.where('year > 1950')
		.where('stage IN (\'Gold\', \'Final\')')
		.where('result IN (\'W\', \'n\')'))
	.toString();

var playersOnMostTeams = squel.select().from('Plays_For')
	.field('DISTINCT pname, COUNT(*)')
	.group('pname')
	.having('COUNT(*) = ?', squel.select().from('Plays_For')
		.field('COUNT(*)')
		.group('pname')
		.order('COUNT(*)', false)
		.limit(1)
	).toString();

var noFinalsTeams = squel.select().from('Country')
	.field('cname')
	.where('cname NOT IN ?', squel.select().from('Competes_In')
		.field('DISTINCT cname')
		.where('stage IN (\'Final\', \'Gold\', \'Silver\')')
	).toString();

var hostedMost = squel.select().from('Hosts')
	.field('cname, COUNT(*) AS num')
	.group('cname')
	.having('COUNT(*) = ?', squel.select().from('Hosts')
		.field('COUNT(*)')
		.group('cname')
		.order('COUNT(*)', false)
		.limit(1)
	).toString();

module.exports = {
	allThreeWins: allThreeWins,
	mostFinalRoundWins: mostFinalRoundWins,
	leastFinalRoundWins: leastFinalRoundWins,
	playersOnMostTeams: playersOnMostTeams,
	noFinalsTeams: noFinalsTeams,
	hostedMost: hostedMost,
	noWins: noWins
}