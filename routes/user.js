const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUser,
  showCurrentUser,
  updateUser,
  updatePassword,
} = require("../controllers/user");

const adminCheck = require("../middleware/adminCheck");

router.route("/").get(adminCheck, getAllUser);
router.route("/show-me").get(showCurrentUser);
router.route("/update-password").patch(updatePassword);
router.route("/:id").get(getUser).patch(updateUser);

module.exports = router;
