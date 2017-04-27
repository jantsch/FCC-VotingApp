'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
	facebook: {
		id: String,
		displayName: String,
		username: String
	},
	twitter: {
		id: String,
		displayName: String,
		username: String
	},
   nbrClicks: {
      clicks: Number
   }
});

User.methods.getObj = function(err){
			console.log("GITHUBBB"+this.github);
			console.log("TWITTER"+this.twitter);
			console.log("FACEBOOK"+this.facebook);
			console.log("USER"+this);
	if(this.hasOwnProperty('github'))
		return  this.github;
	else if(this.hasOwnProperty('twitter'))
		return this.twitter;
	else 
		return this.facebook;
}

module.exports = mongoose.model('User', User);
