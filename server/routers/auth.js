const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema");
const app = express();
const cors = require("cors");

app.use(cors());
router.get("/", (req, res) => {
  res.send("This is From Routeer");
});

router.post("/register", cors(), async (req, res) => {
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

router.post("/signin", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }
    let myToken = "";
    let isRigistered = await User.findOne({ email: email });
    if (isRigistered) {
      console.log("My User Data 45 line", isRigistered);

      const isMatch = await bcrypt.compare(password, isRigistered.password);

      console.log(isRigistered.password, password);
      if (isMatch) {
        myToken = await isRigistered.generateAuthToken();
     
        console.log("My User Token 53 line", myToken);

        res.json({ message: "Signed in Done" });
      } else {
        res.status(400).json({ message: "password not compared" });
      }
    } else {
      return res.status(400).json({ message: "Wrong credential 1" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
