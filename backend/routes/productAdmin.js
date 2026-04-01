const express = require("express");
const mongoose = require("mongoose");

const { adminOnly, userAuth } = require("../middlewares/auth");
const Product = require("../models/Product");

const productAdminRouter = express.Router();

// @route GET /api/admin/products
// @desc Get all products (Admin Only)
// @access Private(Admin)
productAdminRouter.get("/", userAuth, adminOnly, async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "All products fetched successfully!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route POST /api/admin/products
// @desc Creates a new product
// @access Private/Admin
productAdminRouter.post("/", userAuth, adminOnly, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route PUT /api/admin/products/:id
// @desc Updates an existing product id
// @access Private/Admin
productAdminRouter.put("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "discountPrice",
      "countInStock",
      "category",
      "brand",
      "sizes",
      "colors",
      "collections",
      "material",
      "gender",
      "images",
      "isFeatured",
      "isPublished",
      "tags",
      "dimensions",
      "weight",
      "sku",
    ];

    const updates = {};

    for (const key of Object.keys(req.body)) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route DELETE /api/admin/products/:id
// @desc Deletes a product id
// @access Private/Admin
productAdminRouter.delete("/:id", userAuth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = productAdminRouter;
