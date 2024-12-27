const Joi = require("joi")

exports.categoryValidation = (data)=>{

    const categorySchema = Joi.object({
      category_name: Joi.string()
        .min(3)
        .message("Kategoriya nomi 3ta harfdan uzun bo'lishi kerak")
        .max(50)
        .message("katigoriya nomi 50ta harfdan kam bo'lishi kerak")
        .required()
        .messages({
          "string.empty": "kategoriya nomi bo'sh bo'lishi mumkin emas",
          "any.required": "kategoriya nomi kiritilishi kerak",
        }),
      parent_category_id: Joi.string().alphanum().message("ID xato kiritildi"),
    });

    return  categorySchema.validate(data,{abortEarly:false});
//  if (error) {
//    return errorHandler(error, res);
//  }
}