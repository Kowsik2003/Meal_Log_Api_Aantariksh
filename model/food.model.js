const mongoose = require('mongoose');

const foodSchama = new mongoose.Schema({
	name : {
		type : String,
		required : [true,'provide name field']
	},
	calories : {
		type : Number,
		required : [true,'provide calories field']
	},
	foodType : {
		type : String,
		enum : ['Breakfast','Lunch','Dinner'],
		required : [true,'provide foodType field["Breakfast","Lunch","Dinner"]']
	}
},{
	timestamps : true
});

module.exports = mongoose.model('food',foodSchama);