const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      cleared: {
        type: Boolean,
        default: false,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
