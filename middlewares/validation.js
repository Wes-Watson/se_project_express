const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": "The 'Weather' feild must be hot, cold, or warm",
      "string.empty": "The 'Weather' feld must have a selection",
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    email: Joi.string().required().email().unique().messages({
      "string.empty": "The 'email' feild must be filled in",
      "string.email": "The 'email' feild must contain a valid email address",
    }),

    password: Joi.string().required().messages({
      "string.empty": "The 'password' feild must be filled in",
    }),
  }),
});

const validateUserlogin = celebrate({
  body: Joi.object.keys({
    email: Joi.string().required().email().unique().messages({
      "string.empty": "The 'email' feild must be filled in",
      "string.email": "The 'email' feild must contain a valid email address",
    }),

    password: Joi.string().required().messages({
      "string.empty": "The 'password' feild must be filled in",
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object.keys({
    id: Joi.string().length(24).hex().required().messages({
      "string.empty": "The 'id' feild must be filled",
      "string.length": "The 'id' feild must have 24 characters",
      "string.hex": "The 'id' feild must be a valid hexadecimal value",
    }),
  }),
});

module.exports = {
  validateClothingBody,
  validateURL,
  validateUserBody,
  validateUserId,
  validateUserlogin,
};
