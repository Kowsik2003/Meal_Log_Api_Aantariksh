const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	userName : {
		type : String,
		required : [true,'userName field is required'],
		unique : true
	},
	password : {
		type : String,
		required : [true,'userName field is required'],
		select : false,
		min : [6,'minimun length is 6']
	},
	role : {
		type : String,
		default : 'user',
		enum : ['user','admin'] 
	}
});

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password,10);
	next();
});

userSchema.methods.checkPassword = async function(givenPassword,userPassword) {
	return await bcrypt.compare(givenPassword,userPassword);
}

module.exports = mongoose.model('user',userSchema)