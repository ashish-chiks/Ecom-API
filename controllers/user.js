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

const updateUser = async (req, res) => {
  res.send("update user");
};

const updatePassword = async (req, res) => {
  res.send("update password");
};

module.exports = {
  getAllUser,
  getUser,
  showCurrentUser,
  updateUser,
  updatePassword,
};
