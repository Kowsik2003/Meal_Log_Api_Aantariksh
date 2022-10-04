const router = require('express').Router();

const userCtrl = require('../controller/userCtrl');

router.route('/register')
	.post(userCtrl.register)

router.route('/login')
	.post(userCtrl.login)

module.exports = router;