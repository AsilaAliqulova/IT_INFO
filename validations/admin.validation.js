const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),

    email: Joi.string().email().required(),

    phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),

    password: Joi.string().min(6).required(),

    is_active: Joi.boolean().default(true),

    is_creator: Joi.boolean().default(false),
    
    is_superAdmin: Joi.boolean().default(false)
  });

  return adminSchema.validate(data, { abortEarly: false });
};
