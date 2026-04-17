const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const productRouter = express.Router();

// @route GET /api/products
// @desc Get all products with optional query filter
// @access Public
productRouter.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      page = 1,
      limit,
    } = req.query;

    const query = {};

    if (collection && collection !== "all") {
      query.collections = collection;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: color.split(",") };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};

    if (sortBy === "priceAsc") sort.price = 1;
    if (sortBy === "priceDesc") sort.price = -1;
    if (sortBy === "popularity") sort.rating = -1;

    // const skip = (page - 1) * limit;
    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

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
