const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/User");
const { userAuth, adminOnly } = require("../middlewares/auth");

const adminRouter = express.Router();

// @route GET /api/admin/users
// @desc Get all users(admin only)
// @access Private(Admin)
adminRouter.get("/", userAuth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Fetched users successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route POST /api/admin/users
// @desc Add a new user(admin only)
// @access Private(Admin)
adminRouter.post("/", userAuth, adminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route POST /api/admin/users/:id
// @desc Update the user info(admin only) - Name, email and role
// @access Private(Admin)
adminRouter.put("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const user = await User.findById(id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route DELETE /api/admin/users/:id
// @desc Delete the user(admin only)
// @access Private(Admin)
adminRouter.delete("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await user.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully!", data: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = adminRouter;
