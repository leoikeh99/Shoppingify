const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  note: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("items", itemSchema);
