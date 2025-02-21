// const { Schema, model } = require("mongoose");

// const AuthorSchema = new Schema(
//   {
//     author_first_name: {
//       type: String,
//
//       trim: true,
//       uppercase: true,
//     },
//     author_last_name: {
//       type: String,
//       trim: true,
//       uppercase: true,
//     },
//     author_nick_name: {
//       type: String,
//
//       trim: true,
//       uppercase: true,
//       unique: true,
//     },
//     author_email: {
//       type: String,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
//         "Emailni to'g'ri kiriting",
//       ],
//     },
//     author_phone: {
//       type: String,
//       validate: {
//         validator: function (value) {
//           return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
//         },
//         message: (props) => `${props.value}-raqam noto'g'ri`,
//       },
//     },
//     author_password: {
//       type: String,
//       minLength: [6, "parol 6ta belgidan ko'p bo'lishi kerak"],
//     },
//     author_info: {
//       type: String,
//       minLength: [, "info kiriting"],
//       maxLength: [, "info 45tadan kam bo'lishi kerak"],
//     },
//     author_position: {
//       type: String,
//
//     },
//     author_photo: {
//       type: String,
//     },
//     is_expert: {
//       type: Boolean,
//     },
//     author_is_active: {
//       type: String,
//       required: function () {
//         return this.isMarried;
//       }
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// module.exports = model("Author", AuthorSchema);

const { string } = require("joi");
const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      uppercase: true,
    },
    last_name: {
      type: String,
      trim: true,
      uppercase: true,
    },
    nick_name: {
      type: String,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      minLength: [6, "parol 6ta belgidan ko'p bo'lishi kerak"],
    },
    info: {
      type: String,
      minLength: [, "info kiriting"],
      maxLength: [, "info 45tadan kam bo'lishi kerak"],
    },
    position: {
      type: String,
    },
    photo: {
      type: String,
    },
    is_expert: {
      type: Boolean,
    },
    is_active: {
      type: String,
     
    },
    refresh_token: String,
    activation_link: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Author", AuthorSchema);
