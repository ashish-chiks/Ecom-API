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
const attachCookiesToResponse = require("../middleware/cookies");

router.route("/").get(adminCheck, getAllUser);
router.route("/show-me").get(showCurrentUser);
router.route("/update-password").patch(updatePassword);
router
  .route("/:id")
  .get(adminCheck, getUser)
  .patch(updateUser, attachCookiesToResponse);

module.exports = router;
