const Meal  = require('../model/meal.model');
const HashTag = require('../model/hashtag.model');
const Food = require('../model/food.model');

const AppError = require('../utils/AppError');

exports.getHashTags = async (req,res,next) => {
	try {
		const tags = await HashTag.find();

		res.status(200).json({
			status : 'success',
			data :{
				no_of_HashTags : tags.length,
				hashTags : tags
			}
		})
	} catch(err) {
		next(err)
	}
}

const notFood = (body , element) => {
	const items = [];
	let flag = false
	body.forEach(el1 => {
		element.forEach(el2 => {
			if(el1 == el2._id)
				flag = true;
		});
		if(!flag)
			items.push(el1);
		flag = false
	});

	return items
}

const notHash= (body , element) => {
	const items = [];
	let flag = false
	console.log(element)
	body.forEach(el1 => {
		element.forEach(el2 => {
			if(el1 == el2.tagName)
				flag = true;
		});
		if(!flag)
			items.push(el1);
		flag = false
	});

	return items
}

exports.addMeal = async (req,res,next) => {
	try {
		if(!req.body.hashTags)
			return next(new AppError('provide hashTags field',400))
		if(!req.body.foodItems)
			return next(new AppError('provide foodItems field',400))

		const food = await Food.find({_id : {$in : req.body.foodItems}});

		const notfound = notFood(req.body.foodItems,food);

		if(notfound[0])
			return next(new AppError(`foodItems ${notfound} are not found`,404));

		await HashTag.updateMany({tagName : {$in : req.body.hashTags}},{
			$inc : {no_of_uses : 1}
		});

		let hash = await HashTag.find({tagName : {$in : req.body.hashTags}});

		const notfoundTags = notHash(req.body.hashTags,hash)

		if(notfoundTags[0])
		{
			let obj = [];
			notfoundTags.forEach(el => {
				obj.push({
					tagName : el,
					createdBy : req.user._id
				})
			})

			await HashTag.create(obj);
		}

		hash = await HashTag.find({tagName : {$in : req.body.hashTags}});

		let HashIds = [];

		hash.forEach(el => {
			HashIds.push(el._id)
		})

		const meal = await Meal.create({
			hashTags : HashIds,
			foodItems : req.body.foodItems,
			userId : req.user._id
		})

		res.status(200).json({
			status : 'success',
			data : {
				meal
			}
		})

	} catch(err) {
		console.log(err)
		next(err)
	}
}


exports.getMyMeals = async (req,res,next) => {
	try {
		const meals = await Meal.find({userId : req.user._id}).sort('-createdAt');

		res.status(200).json({
			status : 'success',
			data : {
				no_of_meals : meals.length,
				meals
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.getOneMeal = async (req,res,next) => {
	try {

		const meal = await Meal.findOne({userId : req.user._id,_id : req.params.id}).populate('hashTags foodItems');

		if(!meal)
			return next(new AppError('meal not found',404));

		res.status(200).json({
			status : 'success',
			data : {
				meal
			}
		})
	} catch(err) {
		next(err)
	}
}