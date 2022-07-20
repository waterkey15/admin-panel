const Joi = require('@hapi/joi');

const createAccountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    age: Joi.number().integer()
})

module.exports = {
    createAccountSchema
}