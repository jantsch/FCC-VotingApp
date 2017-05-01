'use strict';

var Poll = require('../models/poll.js');

function PollHandler () {

	this.getPoll = function (req, res) {

		var poll_id = req.params.id;
		Poll.findOne({'_id': poll_id}).exec(function(err,result){
				if (err) { throw err; }
				res.json(result);

		})
		
	};

	this.getMyPolls = function (req, res) {

		Poll.find({'owner_id': req.user._id}).exec(function(err,result){
				if (err) { throw err; }				
				res.json(result);

		})
		
	};


	this.getAllPolls = function (req, res) {

		
		Poll.find({}).exec(function(err,result){
				if (err) { throw err; }		
				res.json(result);

		})	
	};
	
this.votePoll = function (req, res) {
	console.log(req.body);
	console.log(req.params.id);
		Poll.find({_id: req.params.id},function(err,item){
			item.totalVotes++;
			item.save(function(err){
				if(err)
					throw err;
				
				res.json(item);


			})



		})
		newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						res.redirect('/poll/'+ newPoll._id);
		})
			
		};


	this.makePoll = function (req, res) {
		var newPoll = new Poll();		
		newPoll.name = req.body.name;
		newPoll.owner_name = req.user.getObj().displayName;
		newPoll.owner_id = req.user._id;
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
						res.redirect('/poll/'+ newPoll._id);
		})
			
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
