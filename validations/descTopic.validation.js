const Joi = require("joi");

exports.descTopicValidation = (data) => {
  const descTopicSchema = Joi.object({
    desc_id: Joi.string().required(),
    topic_id: Joi.string().required()
  });
  return descTopicSchema.validate(data, {
    abortEarly: false,
  });
};
