const mongoose = require("mongoose");

const hisorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("history", hisorySchema);
