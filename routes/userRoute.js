const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  createUser,
  loginUser,
  getSingleUser,
  getAllUser,
  getSingleUserProfile,
  updateUser,
} = require("../controllers/userCtrl");
const {
  validateUserCreate,
  validateUserLogin,
  validateParamId,
  validateUserUpdate,
} = require("../middleware/validator");
const userRouter = express.Router();

userRouter.post("/create", validateUserCreate, createUser);
userRouter.post("/login", validateUserLogin, loginUser);
userRouter.get("/single/:id", validateParamId, getSingleUser);
userRouter.get("/all", authMiddleware, getAllUser);
userRouter.get("/profile", authMiddleware, getSingleUserProfile);
userRouter.put("/update", validateUserUpdate, authMiddleware, updateUser);

module.exports = userRouter;
