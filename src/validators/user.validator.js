import Joi from 'joi';


const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Set to true if you want to validate top-level domains
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required',
        }),
});

const registerSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Username must only contain alpha-numeric characters',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must be at most 30 characters long',
            'string.empty': 'Username is required',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Set to true if you want to validate top-level domains
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required',
        }),
});


const updateSchema = Joi.object({
    id: Joi.string().hex().length(24)
});

export { loginSchema, registerSchema, updateSchema };
