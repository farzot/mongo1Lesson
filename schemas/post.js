const { Schema, model } = require("mongoose");

// title, post_text, author
const userSchema = new Schema(
  {
    title: { type: String, required: true },
    post_text: { type: String, required: true, unique: true },
    author: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("post", userSchema);
