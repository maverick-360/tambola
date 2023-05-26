const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongoDbId");

const createUser = expressAsyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");
    const newUser = await User.create({
      email,
      name,
      password,
    });
    let token = await newUser.getSignedJwtToken();
    res.status(201).json({ newUser, token });
  } catch (error) {
    throw new Error(error);
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found");
    }
    if (user && (await user.isPasswordMatched(password))) {
      let token = await user.getSignedJwtToken();
      res.status(200).json({ user, token });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongodbId(id);
    const foundUser = await User.findById(id, { _id: 1, email: 1, name: 1 });
    if (!foundUser) throw new Error("User not found");
    res.status(200).json({ user: foundUser });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, email: 1, name: 1 });
    res.status(200).json({ users });
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleUserProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const foundUser = await User.findById(_id)
      .populate("tickets", "_id")
      .select("-password")
      .select("-__v");
    if (!foundUser) throw new Error("User not found");
    res.status(200).json({ user: foundUser });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  try {
    validateMongodbId(_id);
    const foundUser = await User.findById(_id);
    if (!foundUser) throw new Error("User not found");
    const updatedUser = await User.findByIdAndUpdate(_id, {
      name,
      email,
    });
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getSingleUser,
  getAllUser,
  getSingleUserProfile,
  updateUser,
};
