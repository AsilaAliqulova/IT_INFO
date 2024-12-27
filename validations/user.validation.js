const Joi = require("joi");

exports.userValidation = (data) => {
  const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#]{3,30}$")),
    confirm_password: Joi.ref("password"), 
    info: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    is_active: Joi.string().default("false"),
  });
  return UserSchema.validate(data, {
    abortEarly: false,
  });
};
