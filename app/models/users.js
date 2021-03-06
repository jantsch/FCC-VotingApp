'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String
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

User.methods.getObj = function(){
	
	if(typeof this.github.id == "string")
		return  this.github;
	else if(typeof this.twitter.id == "string")
		return this.twitter;
	else 
		return this.facebook;
}



module.exports = mongoose.model('User', User);
