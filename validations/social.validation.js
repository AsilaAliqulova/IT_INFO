const Joi = require("joi");

exports.SocialValidation = (data) => {
  const socialSchema = Joi.object({
    social_name: Joi.string().required(),
    sicual_icon_file: Joi.string().default("/social.png"),
  });
  return socialSchema.validate(data, {
    abortEarly: false,
  });
};
