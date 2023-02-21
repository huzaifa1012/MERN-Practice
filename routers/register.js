const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/schema");
router.get("/", (req, res) => {
  res.send("This is From Routeer");
});

router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !phone || !email || !password) {
    return res.status(400).json("some fields are  missing");
  }
  try {
    let Already = await User.findOne({ email: email });

    if (Already) {
      return res.status(404).json("You are already registered");
    }
    const user = new User({ name, phone, email, password });
    let saving = await user.save();

    if (saving) {
      res.status(200).json("You've Successfully Registered");
    }
  } catch {
    (e) => console.log(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }
    let isRigistered = await User.findOne({ email: email });
    if (!isRigistered) {
      return res.status(400).json({ message: "Wrong credential" });
    }
    let Authverif = await bcrypt.compare(password, isRigistered.password);
    if (Authverif) {
      res.status(200).json({ message: "you are sign in" });
    } else {
      res.status(400).json({ message: "Wrong credential" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
