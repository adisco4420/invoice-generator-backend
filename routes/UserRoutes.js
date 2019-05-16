const express = require('express');
const JoiValidator = require('../middlewares/validator');
const UserController = require('../controller/UserController');
const {RegisterUserValidator, ConfirmUserValidator, ResendEmailValidator, 
    SetupUserValidator, LoginUserValidator} = require('../validations/UserValidator')
const AuthMiddleWare = require('../middlewares/auth');
const router = express.Router();

router.post('/register', JoiValidator(RegisterUserValidator), UserController.RegisterUser);
router.post('/confirm', JoiValidator(ConfirmUserValidator), UserController.ConfirmUser);
router.post('/resend', JoiValidator(ResendEmailValidator), UserController.ResendEmail);
router.patch('/setup', JoiValidator(SetupUserValidator), AuthMiddleWare,  UserController.SetupUser);
router.post('/login', JoiValidator(LoginUserValidator), UserController.LoginUser)
router.get('/profile', AuthMiddleWare, UserController.UserProfile)
module.exports = router;