const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Order = require("../models/Order");
const mongoose = require("mongoose");

const orderRouter = express.Router();

// @route GET /api/order/my-orders
// @desc Get logged-in user orders
// @access Private
orderRouter.get("/my-orders", userAuth, async (req, res) => {
  try {
    // Sort most recent orderss
    const orders = await Order.find({ user: req.user._id })
      .sort({
        createdAt: -1,
      })
      .lean();
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route GET /api/order/:id
// @desc Get order details by id
// @access Private
orderRouter.get("/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order Id." });
    }

    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order Details fetched successfully!",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = orderRouter;
