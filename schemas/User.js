const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        "Emailni to'g'ri kiriting",
      ],
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

    photo: {
      type: String,
    },

    is_active: {
      type: String,
    },
    refresh_token :{
      type:String
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("User", UserSchema);
