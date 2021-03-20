const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { name, items } = req.body;
  try {
    const check = await Cart.findOne({ userId });
    if (!check) {
      const cart = new Cart({ userId, name, items });
      await cart.save();
      return res.json(cart);
    }
    if (check) {
      const update = await Cart.findOneAndUpdate(
        { userId },
        { $set: { name, items } },
        { new: true }
      );
      return res.json(update);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
