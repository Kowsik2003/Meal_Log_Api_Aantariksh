const mongoose = require('mongoose');

const mealSchama = new mongoose.Schema({
	userId : {
		type : mongoose.mongoose.Schema.Types.ObjectId,
		ref : 'user'
	},
	hashTags : [{
			type : mongoose.mongoose.Schema.Types.ObjectId,
			ref : 'hashtag'
		}],
	foodItems : [{
		type : mongoose.mongoose.Schema.Types.ObjectId,
		ref : 'food'
	}]

},{
	timestamps : true
});

module.exports = mongoose.model('meal',mealSchama);