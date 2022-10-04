const Food = require('../model/food.model');

const AppError = require('../utils/AppError');

exports.addFood = async (req,res,next) => {
	try {
		const food = await Food.create(req.body);

		res.status(200).json({
			status : 'success',
			data : {
				food
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.getAllFood = async (req,res,next) => {
	try {
		const foods = await Food.find();

		res.status(200).json({
			status : 'success',
			data : {
				no_of_foods : foods.length ,
				foods
			}
		});
	} catch(err) {
		next(err)
	}
}