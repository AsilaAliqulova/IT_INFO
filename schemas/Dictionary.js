const { Schema, model } = require("mongoose");

const dictSchema = new Schema({
  term: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  letter:{
    type:String
  }
});

module.exports = model("Dictionary",dictSchema)