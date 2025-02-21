// const Joi = require("joi");

// const authorFullName = (parent) => {
//   return PannerNode.author_first_name + "" + parent.author_last_name;
// };

// exports.authorValidation = (data) => {
//   const authorSchema = Joi.object({
//     author_first_name: Joi.string().required(),
//     author_last_name: Joi.string(),
//     author_nick_name: Joi.string().min(2).max(2),
//     author_email: Joi.string().email().lowercase(),
//     author_phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
//     author_password: Joi.string()
//     .pattern(
//       new RegExp("^[a-zA-Z0-9!@#]{3,30}$")
//     ),
//     confirm_password: Joi.ref(author_password),
//     author_info: Joi.string(),
//     author_position: Joi.string(),
//     author_photo: Joi.string().default("/author/avatar.png"),
//     is_expert: Joi.boolean().default(false),
//     author_is_active: Joi.boolean().default(false),
//   });

//   return authorSchema.validate(data, { abortEarly: false });
// };



const Joi = require("joi");

exports.authorValidation = (data) => {
  const authorSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    nick_name: Joi.string().min(2).max(20),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9!@#]{3,30}$")),
    confirm_password: Joi.ref("password"), //dataga yuklanmaydi
    email: Joi.string().email().lowercase(),
    phone: Joi.string()
    .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
    info: Joi.string(),
    position: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    is_expert: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
    gender:Joi.string().valid("erkak","ayol"),
    birth_date: Joi.date().less("2000-01-01"),
    birth_year: Joi.number().integer().min(1980).max(2002),
    referred: Joi.boolean().default(false),
    referreDetails: Joi.string().when("referred",{
        is:true,
        then: Joi.string().required(),
        otherwise:Joi.string().optional()
    }),

    coding_langs: Joi.array().items(Joi.string(),Joi.number()),
    is_yes:Joi.boolean().truthy("YES","HA").valid(true)
  });
  return authorSchema.validate(data, {
    abortEarly: false,
  }); 
};
