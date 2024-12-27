const { Schema, model } = require("mongoose");

const desSchema = new Schema({
  category_id: [{
    type: Schema.Types.ObjectId,
    ref: "Category",
  }],
  description: {
    type: String,
    minLEngth:[6]
  },
});

module.exports = model("Description", desSchema);
