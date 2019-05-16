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
  businnessName: joi.string().required(),
  businnessCategory: joi.string().required(),
  currency: joi.string().required()
};