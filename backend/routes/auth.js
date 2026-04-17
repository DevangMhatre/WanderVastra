const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
const { validateRegister } = require("../middlewares/validate");

// @route POST /api/users/register
// @desc Registers a new users
// @access public
userRouter.post(
  "/register",
  validateRegister,
  asyncHandler(authController.registerUser),
);

// @route POST /api/users/login
// @desc Authenticates the user
// @access public
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    // 🔐 Generate token
    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route POST /api/users/logout
// @desc Logs out user
// @access public
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 0,
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});

userRouter.get("/me", userAuth, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

module.exports = userRouter;
