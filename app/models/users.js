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
		{	var obj = this.github;
			obj['provider'] = "github";
			return  obj;
		}
	else if(typeof this.twitter.id == "string")
		{
			var obj = this.twitter;
			obj['provider'] = "twitter";
			return  obj;
		}
	else 
		{
			var obj = this.facebook;
			obj['provider'] = "facebook";
			return  obj;
		}
}



module.exports = mongoose.model('User', User);
