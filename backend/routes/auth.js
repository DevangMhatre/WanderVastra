const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();
const validateSignUpData = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

// @route POST /api/users/register
// @desc Registers a new users
// @access public
userRouter.post("/register", async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    if (error.message) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

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
