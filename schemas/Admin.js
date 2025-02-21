const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, "Admin name must be at least 3 characters"],
      maxLength: [50, "Admin name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}-\d{3}-\d{2}-\d{2}$/.test(value);
        },
        message: (props) => `${props.value}-raqam noto'g'ri`,
      },
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
    },
    refresh_token:{
      type:String
    },
    is_superAdmin:{
      type:Boolean,
      default:false
    },
    
    is_active:{
      type:String
    }

 
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
    versionKey: false,
  }
);

module.exports = model("Admin", adminSchema);
