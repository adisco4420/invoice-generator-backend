const express = require('express');
const JoiValidator = require('../middlewares/validator');
const UserController = require('../controller/UserController');
const {RegisterUserValidator} = require('../validations/UserValidator')
const router = express.Router();

router.post('/register', JoiValidator(RegisterUserValidator), UserController.RegisterUser)

module.exports = router;