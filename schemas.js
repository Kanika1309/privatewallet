const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

// module.exports.accountSchema = Joi.object({
//     account: Joi.object({
//         name: Joi.string().required().escapeHTML(),
//         income: Joi.number().required().min(0)
//         //image: Joi.string().required(),
//         // location: Joi.string().required().escapeHTML(),
//         // description: Joi.string().required().escapeHTML()
//     }).required(),
//     // deleteImages: Joi.array()
// });

// module.exports.dailySchema = Joi.object({
//     daily: Joi.object({
//         date: Joi.string().required().escapeHTML(),
//         bonus: Joi.number().required().min(0),
//         expenditure: Joi.number().required().min(0)
//         // saving: Joi.number().required().min(0)
//     }).required()
// })