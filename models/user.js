const mongoose = require("mongoose");
const { isEmail } = require("validator");

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
      message: (props) => `${props} is not a valid email`,
    },
    required: [true, "please provide user email"],
  },
  password: {
    type: String,
    required: [true, "please provide user password"],
    minlength: [3, "password should have length alteast 3"],
    maxlength: [50, "password should have length almost 50"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
