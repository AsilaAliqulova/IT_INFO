const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  category_name: {
    type: String,
  },
  parent_category_id: {
    type: String
  },
});

module.exports = model("Category", categorySchema);
