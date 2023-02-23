const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

userSchema.pre("save", async function (next) {
 if(this.isModified('password')){
     let hashedPassword = await bcrypt.hash(this.password, 12);
     this.password = hashedPassword;
    
     next();
    
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id.toString() }, process.env.SEC_KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;

// Hashing Password
