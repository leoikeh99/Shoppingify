const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

//get a user
router.get("/", auth, async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid user" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
