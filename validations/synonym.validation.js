const Joi = require("joi");

exports.SynonymValidation = (data) => {
  const synonymSchema = Joi.object({
 
  desc_id: Joi.string().required(),
  dict_id: Joi.string().required()
  });
  return synonymSchema.validate(data, {
    abortEarly: false,
  });
};
