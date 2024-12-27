const Joi = require("joi");

exports.TopicValidation = (data) => {
  const topicSchema = Joi.object({
    author_id: Joi.string(),
    topic_title: Joi.string()
      .min(3)
      .message("Title uzunligi 3ta belgidan ko'p bo'lishi kerak"),
    topic_text: Joi.string()
      .min(15)
      .message("Topic text 15ta belgidan kop bolishi kerak"),
    is_checked: Joi.boolean().default(false),
    is_approved: Joi.boolean().default(false),
    expert_id: Joi.string().when("is_checked", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
  });
  return topicSchema.validate(data, {
    abortEarly: false,
  });
};
