const joi = require('joi');

exports.RegisterUserValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phoneNumber: joi.number().required(),
  password: joi.required()
};