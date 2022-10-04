const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const AppError = require('../utils/AppError')

const signToken = (id) => {
		const token = jwt.sign({id : id},process.env.JWT_KEY);

		return token;
}

exports.register = async (req,res,next) => {
	try {
				console.log("test")
		if(!req.body.userName || !req.body.password)
			return next(new AppError('provide userName and password'));

		const ckUser = await User.findOne({userName : req.body.userName});

		if(ckUser)
			return next(new AppError('userName exist already',400));

		const user = await User.create({
			userName : req.body.userName,
			password : req.body.password
		});

		const token  = signToken(user._id);

		res.status(200).json({
			status : 'success',
			jwt : token
		});
	} catch(err) {
		next(err)
	}
}

exports.login = async (req,res,next) =>{
	try {
		if(!req.body.userName || !req.body.password)
			return next(new AppError('provide userName and password'));

		const ckUser = await User.findOne({userName : req.body.userName}).select('password');

		if(!ckUser)
			return next(new AppError('userName not found',404));

		if(!(await ckUser.checkPassword(req.body.password,ckUser.password)))
			return next(new AppError('incorrect password',400));

		const token  = signToken(ckUser._id);

		res.status(200).json({
			status : 'success',
			jwt : token
		});
	} catch(err) {
		next(err)
	}
}

exports.protect = async (req,res,next) => {
	try {
		const token = req.headers.authorization;

		if(!token)
			return next(new AppError('user not logged In',403));

		const jwtId = await promisify(jwt.verify)(token,process.env.JWT_KEY);

		const jwtUser = await User.findById(jwtId.id);

		if(!jwtUser)
			return next(new AppError('The user does not exist !',404));

		req.user = jwtUser;
		next();
	} catch (err) {
		return next(err);
}
}

exports.admin = (req,res,next) => {
	if(!(req.user.role == 'admin'))
		return next(new AppError('unauthorized route',401));

	next();
}