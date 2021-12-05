const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/auth");
const attachCookiesToResponse = require("../middleware/cookies");

router.route("/register").post(register, attachCookiesToResponse);
router.route("/login").post(login, attachCookiesToResponse);
router.route("/logout").get(logout);

module.exports = router;
