const { Schema, model } = require("mongoose");

const socialSchema = new Schema({
  social_name: {
    type: String,
  },
  sicual_icon_file: {
    type: String,
  },
});

module.exports = model("Social", socialSchema);


 