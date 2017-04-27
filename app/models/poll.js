'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	name: String,
	owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  	owner_name: String,
	totalVotes: Number,
	options: [
	   {
	      id: mongoose.Types.ObjectId(),
	      text: String,
		  votes: Number
	   }
  ],
	
});


module.exports = mongoose.model('Poll', Poll);
