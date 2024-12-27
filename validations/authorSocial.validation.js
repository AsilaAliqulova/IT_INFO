const Joi = require("joi");

exports.authorSocialValidation = (data) => {
  const authorSocialSchema = Joi.object({
    author_id:Joi.string().required(), 
    social_id: Joi.string().required(),
    social_link: Joi.string()
  });
  return authorSocialSchema.validate(data, {
    abortEarly: false,
  });
};
