const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const productController = require("../controllers/productController");

const productRouter = express.Router();

// @route GET /api/products
// @desc Get all products with optional query filter
// @access Public
productRouter.get("/", asyncHandler(productController.getAllProducts));

// @route GET /api/products/best-seller
// @desc Retreives the product with highest rating
// @access Public
// ? Pasted this code before /:id, otherwise it would have treated as same as /:id instead of /best-seller
productRouter.get("/best-seller", async (req, res) => {
  try {
    const product = await Product.findOne().sort({ rating: -1 });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route GET /api/products/new-arrivals
// @desc Retreives the lastest 8 product - Creation Date
// @access Public
// ? Pasted this code before /:id, otherwise it would have treated as same as /:id instead of /new-arrivals
productRouter.get("/new-arrivals", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route GET /api/products/similar/:id
// @desc Retreives similar product based on the current product's gender and category
// @access Public
productRouter.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json({
      success: true,
      data: similarProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route GET /api/products/:id
// @desc Get a single product by id
// @access Public
productRouter.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = productRouter;
