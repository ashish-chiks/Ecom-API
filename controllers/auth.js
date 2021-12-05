const userModel = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res, next) => {
  // const {email} = req.body
  // const userAlreadyExist = await userModel.findOne({email})
  // if (userAlreadyExist) throw new BadRequestError("user already exist")

  const user = await userModel.create(req.body);
  req.user = user;
  next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("please provide email and password");

  const user = await userModel.findOne({ email });
  if (!user) throw new UnauthenticatedError("no user with this email found");

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) throw new UnauthenticatedError("wrong password");

  req.user = user;
  next();
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(StatusCodes.OK).json({});
};

module.exports = { register, login, logout };
