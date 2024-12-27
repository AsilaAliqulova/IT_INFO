const { Schema, model } = require("mongoose");

const DescTopicSchema = new Schema({
  desc_id: [{
    type: Schema.Types.ObjectId,
    ref: "Description",
  }],
  topic_id: [{
    type: Schema.Types.ObjectId,
    ref: "Topic",
  }],
});

module.exports = model("DescTopic", DescTopicSchema);
