const express = require('express');
const JoiValidator = require('../middlewares/validator');
const UserController = require('../controller/UserController');
const {RegisterUserValidator, ConfirmUserValidator, ResendEmailValidator} = require('../validations/UserValidator')
const router = express.Router();

router.post('/register', JoiValidator(RegisterUserValidator), UserController.RegisterUser);
router.post('/confirm', JoiValidator(ConfirmUserValidator), UserController.ConfirmUser);
router.post('/resend', JoiValidator(ResendEmailValidator), UserController.ResendEmail);

module.exports = router;