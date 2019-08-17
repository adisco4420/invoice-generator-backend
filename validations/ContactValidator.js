const joi = require('joi');
exports.AddContactValidator = {
  fullName: joi.string().required(),
  email: joi.string().required().email({ minDomainSegments: 2 }),
  phoneNumber: joi.number(),
  address: joi.string()
};
