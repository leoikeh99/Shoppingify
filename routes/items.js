const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Item = require("../models/Item");

const auth = require("../middleware/auth");
const {
  findOneAndUpdate,
  findById,
  findByIdAndUpdate,
} = require("../models/Category");

//add an item
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { name, category, note, image } = req.body;

  try {
    const check = await Category.findOne({
      userId,
      lowercase: category.toLowerCase(),
    });
    if (!check) {
      const saveCategory = new Category({
        category,
        userId,
        lowercase: category.toLowerCase(),
      });
      await saveCategory.save();

      const saveItem = new Item({
        userId,
        name,
        category,
        note,
        image,
      });
      await saveItem.save();

      return res.json(saveItem);
    } else {
      const saveItem = new Item({
        userId,
        name,
        category,
        note,
        image,
      });
      await saveItem.save();

      return res.json(saveItem);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await Category.find({ userId });
    const items = await Item.find({ userId });

    res.json({ categories, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const { name, category, note, image } = req.body;
  const id = req.params.id;

  try {
    const update = { name, category };
    if (note) update.note = note;
    if (image) update.image = image;

    const check = await Category.findOne({
      userId,
      lowercase: category.toLowerCase(),
    });

    if (!check) {
      const saveCategory = new Category({
        category,
        userId,
        lowercase: category.toLowerCase(),
      });
      await saveCategory.save();

      await Item.findByIdAndUpdate(id, { $set: update }, { new: true });

      const categories = await Category.find({ userId });
      const items = await Item.find({ userId });

      return res.json({ categories, items });
    } else {
      await Item.findByIdAndUpdate(id, { $set: update }, { new: true });

      const categories = await Category.find({ userId });
      const items = await Item.find({ userId });

      return res.json({ categories, items });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
