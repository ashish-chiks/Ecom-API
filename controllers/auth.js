const userModel = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  
  // const {email} = req.body
  // const userAlreadyExist = await userModel.findOne({email})
  // if (userAlreadyExist) throw new BadRequestError("user already exist")

  const user = await userModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
