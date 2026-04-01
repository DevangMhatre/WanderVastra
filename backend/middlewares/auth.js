const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not Logged In. Please Login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized. Token failed." });
  }
};

// Middleware to check if the user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(); // No token → guest
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      res.clearCookie("token"); // cleanup bad token
      return next(); // continue as guest
    }

    req.user = user;
    next();
  } catch (error) {
    // Token invalid or expired
    res.clearCookie("token");
    return next(); // continue as guest
  }
};

module.exports = { userAuth, adminOnly, optionalAuth };
