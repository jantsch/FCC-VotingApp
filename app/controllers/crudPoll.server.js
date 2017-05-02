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
		Poll.findOne({_id: req.params.id},function(err,item){

			if(req.user != undefined)
			{
				var voted = item.vote_details.find(function (element) { 
				    return element.id === req.user._id;
				})
				if(voted == null)
				{
						item.totalVotes++;
						item.options.forEach(function(element){
							if(element._id == req.body.option_id){
								element.votes = element.votes +1;
							}
							})
						item.vote_details.push({id:req.user._id});

						item.save(function(err){
							if(err)
								throw err;
							
							res.json(item);
						})

				}
				else
				{
					res.json("err": "User has already voted.");
				}
			}
			else
			{
				var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
				
				var voted = item.vote_details.find(function (element) { 
				    return element.id === ip;
				})
				if(voted == null)
				{
						item.totalVotes++;
						item.options.forEach(function(element){
							if(element._id == req.body.option_id){
								element.votes = element.votes +1;
							}
							})
						item.vote_details.push({id: ip});
						item.save(function(err){
							if(err)
								throw err;
							
							res.json(item);
						})

				}
				else
				{
						res.json("err": "User has already voted.");

				}


			}
			
			
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

	this.delPoll = function(req,res){
		Poll.remove({ _id: req.params.id}, function(err) {
	    if (err) {
	            res.sendStatus(500);
	    }
	    else {
	     
	           res.json({ok:true});
	    }
	});


	}

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
