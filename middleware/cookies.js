const { StatusCodes } = require("http-status-codes");

const attachCookiesToResponse = (req, res) => {
  const { payload, token } = req.user.generateToken();

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRY)),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.CREATED).json({ user: payload });
};

module.exports = attachCookiesToResponse;
