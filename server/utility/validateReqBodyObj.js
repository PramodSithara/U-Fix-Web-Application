const Joi = require('joi');

const validationObj = {
    category: Joi.string().required(),
    problem: Joi.string().required(),
    identification: Joi.array().required(),
    step1: Joi.string(),
    step2: Joi.string(),
    step3: Joi.string()
}

module.exports = { validationObj }