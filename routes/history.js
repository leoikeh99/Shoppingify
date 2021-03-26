const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const History = require("../models/History");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { name, type, items, completed } = req.body;

  try {
    const history = new History({ userId, name, type, items, completed });
    await history.save();
    await Cart.findOneAndRemove({ userId });
    res.json(history);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await History.find({ userId });
    res.json(history);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    await History.findByIdAndUpdate(id, {
      $set: { deleted: true },
    });

    const history = await History.findById(id);
    res.json(history);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
