const router = require('express').Router();

const foodCtrl = require('../controller/foodCtrl');

const userCtrl = require('../controller/userCtrl');

router.route('/')
	.post(userCtrl.protect,userCtrl.admin,foodCtrl.addFood)
	.get(userCtrl.protect,foodCtrl.getAllFood)

module.exports = router;