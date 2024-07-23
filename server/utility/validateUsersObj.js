const Joi = require('joi');

const validationObj = {
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().optional(),
    password: Joi.string().required()
}

module.exports = { validationObj }