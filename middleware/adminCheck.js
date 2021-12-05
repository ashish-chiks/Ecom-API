const { UnauthenticatedError } = require("../errors");

const adminCheck = (req, res, next) => {
  if (req.payload.role !== "admin")
    throw new UnauthenticatedError(
      "Permission denied! You don't have access to this route"
    );
  next();
};

module.exports = adminCheck;
