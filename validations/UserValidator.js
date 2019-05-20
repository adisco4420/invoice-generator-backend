const joi = require('joi');
exports.RegisterUserValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phoneNumber: joi.number().required(),
  password: joi.required()
};
exports.ConfirmUserValidator = {
  token: joi.required()
};
exports.ResendEmailValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
};
exports.SetupUserValidator = {
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  businessName: joi.string().required(),
  businessCategory: joi.string().required(),
  currency: joi.string().required()
};
exports.LoginUserValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.required()
};