const express = require("express");
const User = require("../models/User");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(401).json({ success: false, message: "User not found!" });
  }
});

module.exports = profileRouter;
