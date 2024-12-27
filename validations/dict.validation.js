const Joi = require("joi");

exports.dictValidation = (data) => {
  const dictSchema = Joi.object({
    term: Joi.string().min(3).message("3tadan ko'p belgi kiriting"),
    letter: Joi.string().max(2).message("2tadan ortiq belgi kiritolmaysiz")
  });
  return dictSchema.validate(data, {
    abortEarly: false,
  });
};
