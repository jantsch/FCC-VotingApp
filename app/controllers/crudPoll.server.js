'use strict';

var Poll = require('../models/poll.js');

function PollHandler () {
/**
	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};
	**/

	this.makePoll = function (req, res) {
		var newPoll = new Poll();
		
		console.log(req.body);
		//res.json(req);
		newPoll.name = req.body.name;
		var options = req.body.option.split('\r\n');
		options.forEach(function(item){
			newPoll.options.push({
				text: item			
			})
		})
		
		
		newPoll.save(function (err) {
						if (err) {
							throw err;
						}
		})
			
		res.json(newPoll);
		
	};
/**
	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};
**/
}

module.exports = PollHandler;
