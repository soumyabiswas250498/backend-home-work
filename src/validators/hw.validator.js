import Joi from 'joi';



const homeworkSchema = Joi.object({
    classroom: Joi.string()
        .valid('5', '6', '7', '8', '9', '10', '11', '12')
        .required()
        .messages({
            'any.only': 'Class must be one of: 5, 6, 7, 8, 9, 10, 11, 12',
            'any.required': 'Class is required',
        }),
    section: Joi.string()
        .valid('a', 'b', 'c', 'd', 'e', 'f', 'arts', 'science', 'commerce')
        .required()
        .messages({
            'any.only': 'Section must be one of: a, b, c, d, e, f, arts, science, commerce',
            'any.required': 'Section is required',
        }),
    subject: Joi.string()
        .valid(
            'English', 'Bengali', 'Math', 'History', 'Geography', 'Physics', 'Chemistry',
            'Biology', 'Others', 'Physical Science', 'Life Science', 'General Science',
            'ENVS', 'H & PE', 'Work Education', 'Pol. Sc.', 'Philosophy', 'Eco Geo', 'Economics'
        )
        .required()
        .messages({
            'any.only': 'Subject must be one of: English, Bengali, Math, History, Geography, Physics, Chemistry, Biology, Others, Physical Science, Life Science, General Science, ENVS, H & PE, Work Education, Pol. Sc, Philosophy, Eco Geo, Economics',
            'any.required': 'Subject is required',
        }),
    author: Joi.string().hex().length(24),
    heading: Joi.string()
        .required()
        .messages({
            'string.empty': 'Heading is required',
        }),
    description: Joi.string(),
    file: Joi.string(),
});

const idSchema = Joi.object({
    id: Joi.string().hex().length(24).messages({
        'string.length': 'Not Valid ID',
    })
});

export { homeworkSchema, idSchema }