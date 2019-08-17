const express = require('express');
const JoiValidator = require('../middlewares/validator');
const ContactController = require('../controller/ContactController');
const validator = require('../validations/ContactValidator');
const AuthMiddleWare = require('../middlewares/auth');
const router = express.Router();

router.put('/update/:id', JoiValidator(validator.AddContactValidator), AuthMiddleWare, ContactController.UpdateContact);
router.delete('/delete/:id', AuthMiddleWare, ContactController.DeleteContact);
router.post('/add', JoiValidator(validator.AddContactValidator), AuthMiddleWare, ContactController.AddContact);
router.get('/list', AuthMiddleWare, ContactController.ListContact)
router.get('/:id', AuthMiddleWare, ContactController.ViewContact);

module.exports = router