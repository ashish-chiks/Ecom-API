const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token)
    throw new UnauthenticatedError(
      "Authentication failed! Please log in again"
    );
  try {
    const { userId, name, role } = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    req.payload = { userId, name, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "Authentication Invalid! Token verification failed"
    );
  }
};

module.exports = authenticateUser;
