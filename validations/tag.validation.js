const Joi = require("joi");

exports.TagValidation = (data) => {
  const tagSchema = Joi.object({
    topic_id: Joi.string().required(),
    category_id: Joi.string().required(),
  });
  return tagSchema.validate(data, {
    abortEarly: false,
  });
};
