const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  topic_title: {
    type: String,
  },
  topic_text: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  update_date: {
    type: Date,
  },
  is_checked: {
    type: Boolean,
  },
  is_approved: {
    type: Boolean,
  },
  expert_id: {
    type: Number,
  },
});

module.exports = model("Topic", topicSchema);
