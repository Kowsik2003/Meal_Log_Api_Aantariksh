const router = require('express').Router();

const mealCtrl = require('../controller/mealCtrl');

const userCtrl = require('../controller/userCtrl');

router.route('/')
	.post(userCtrl.protect,mealCtrl.addMeal)
	.get(userCtrl.protect,mealCtrl.getMyMeals)

router.get('/hashtag',userCtrl.protect,mealCtrl.getHashTags);

router.get('/:id',userCtrl.protect,mealCtrl.getOneMeal)

module.exports = router