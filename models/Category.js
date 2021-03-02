const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  category: {
    type: String,
    required: true,
  },
  lowercase: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("categories", categorySchema);
