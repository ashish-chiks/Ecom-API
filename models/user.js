const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide user name"],
    minlength: [3, "name should have length alteast 3"],
    maxlength: [50, "name should have length almost 50"],
  },
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: ({ value }) => `${value} is not a valid email`,
    },
    unique: true,
    required: [true, "please provide user email"],
  },
  password: {
    type: String,
    required: [true, "please provide user password"],
    minlength: [3, "password should have length alteast 3"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  this.role = "user";
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (pswd) {
  const isCorrect = await bcrypt.compare(pswd, this.password);
  return isCorrect;
};

userSchema.methods.generateToken = function () {
  const payload = { userId: this._id, name: this.name, role: this.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return { payload, token };
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
