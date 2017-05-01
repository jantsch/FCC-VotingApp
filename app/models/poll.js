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
	
});

Poll.methods.getStatisticData = function(){
	var str = [];
	this.options.forEach(function(element,index){
		console.log(element);
		console.log(element.votes);
		console.log(element._id);

   var obj = new Object();
   obj.id = element._id;
   obj.votes  = element.votes;
   var jsonString= JSON.stringify(obj);
   str.push(jsonString);

	})
	console.log(str);
	

	return {"totaVotes": this.totalVotes}



}


module.exports = mongoose.model('Poll', Poll);
