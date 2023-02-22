const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    let myToken;
    let isMatch 
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }

    let isRigistered = await User.findOne({ email: email });

    if (isRigistered) {
      // myToken = await isRigistered.generateAuthToken();
      // console.log(myToken);

       isMatch = await bcrypt.compare(password, isRigistered.password);

      if (!isMatch) {
        res.status(400).json({ message: "password not compared" });
      } else {
        res.json({ message: "Signed in Done" });
        // res.status(200).json({ message: "Signed in Done" });
      }
    } else {
      return res.status(400).json({ message: "Wrong credential 1" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
