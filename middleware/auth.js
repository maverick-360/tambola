const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  let token;
  try {
    if (req.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new Error("There is no token attached to the header");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //find the user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Please login again");
    }
    //attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
