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
	var str = ""
	this.options.forEach(function(element,index){
		var str2 = {index: element};
		var str = str.concat(str2);

	})

	console.log("CHEGUEIIIIIIIII:" + str);
	console.log("CHEGUEIIIIIIIII:" + {"totaVotes": this.totalVotes,str
			});

	return {"totaVotes": this.totalVotes,str
			}



}


module.exports = mongoose.model('Poll', Poll);
