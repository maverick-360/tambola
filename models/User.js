const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email address is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Get Signed JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const User = model("User", userSchema);
module.exports = User;
