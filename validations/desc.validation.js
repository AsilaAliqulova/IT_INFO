const Joi = require("joi");

exports.descValidation = (data) => {
  const descSchema = Joi.object({
    category_id: Joi.string().required(),
    description: Joi.string().required(),
  });
  return descSchema.validate(data, {
    abortEarly: false,
  });
};
