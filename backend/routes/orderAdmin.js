const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/Order");
const { userAuth, adminOnly } = require("../middlewares/auth");
const orderAdminRouter = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private(Admin)
orderAdminRouter.get("/", userAuth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private(Admin)
orderAdminRouter.put("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    const updateFields = {
      status: req.body.status,
    };

    if (req.body.status === "delivered") {
      updateFields.isDelivered = true;
      updateFields.deliveredAt = Date.now();
    }

    const order = await Order.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).populate("user", "name");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete the order(admin only)
// @access Private(Admin)
orderAdminRouter.delete("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully!",
      data: id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = orderAdminRouter;
