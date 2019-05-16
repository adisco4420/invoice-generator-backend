const express = require('express');
const JoiValidator = require('../middlewares/validator');
const ContactController = require('../controller/ContactController');
const { AddContactValidator } = require('../validations/ContactValidator');
const AuthMiddleWare = require('../middlewares/auth');
const router = express.Router();

router.post('/add', JoiValidator(AddContactValidator), AuthMiddleWare, ContactController.AddContact);

module.exports = router