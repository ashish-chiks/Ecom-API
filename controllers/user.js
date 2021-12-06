const userModel = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const getAllUser = async (req, res) => {
  const users = await userModel.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  if (!user) throw new NotFoundError(`no user found with id ${req.params.id}`);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.payload });
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email)
    throw new BadRequestError("please provide name and email");
  const user = await userModel.findByIdAndUpdate(req.payload.userId, req.body, {
    runValidators: true,
    new: true,
  });
  req.user = user;
  next();
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new BadRequestError("please provide both passwords");

  const user = await userModel.findById(req.payload.userId);
  const checkPassword = await user.comparePassword(oldPassword);

  if (!checkPassword) throw new UnauthenticatedError("wrong current password");
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.CREATED).json({});
};

module.exports = {
  getAllUser,
  getUser,
  showCurrentUser,
  updateUser,
  updatePassword,
};
