const Joi = require('joi');

const schema = Joi.object({
    member_id: Joi.integer().min(1).required(),
    firstname: Joi.string()
        .min(3)
        .max(10)
        .required(),
    lastname: Joi.string()
        .min(3)
        .max(10)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['co'] } })
        .required(),
        
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    document: Joi.number()
        .min(5)
        .max(15)
        .required(),
    phone: Joi.number()
        .required(),
    image_path: Joi.string().required()
})

module.exports = schema;
