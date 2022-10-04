const mongoose = require('mongoose');

const hashTagSchama = new mongoose.Schema({
	tagName : {
		type : String,
		required : true
	},
	createdBy : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'user'
	},
	no_of_uses : {
		type : Number,
		default : 1
	} 
},{
	timestamps : true
});

module.exports = mongoose.model('hashtag',hashTagSchama);