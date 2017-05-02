'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	name: String,
	owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  	owner_name: String,
	totalVotes: {type:Number, default: 0},
	options: [
	   {
	      text: String,
		  votes: {type:Number, default: 0}
	   }
  ],
  	vote_details:[
  		{ id: String }

  	]
	
});


module.exports = mongoose.model('Poll', Poll);
