const express = require("express");

const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { optionalAuth, userAuth } = require("../middlewares/auth");

const cartRouter = express.Router();

// Helper function to get userId or guestId
const getCart = (userId, guestId) => {
  if (userId) {
    return Cart.findOne({ user: userId });
  } else if (guestId) {
    return Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for the guest or logged in user
// @access Public
cartRouter.post("/", optionalAuth, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body || {};

    if (!productId || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const userId = req.user?._id || null;
    let guestId = req.cookies?.guestId || null;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔎 Get existing cart
    let cart = await getCart(userId, guestId);

    // =============================
    // IF CART EXISTS → UPDATE
    // =============================
    if (cart) {
      const normalizedSize = size || null;
      const normalizedColor = color || null;

      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          (p.size || null) === normalizedSize &&
          (p.color || null) === normalizedColor,
      );

      const finalPrice = product.discountPrice || product.price;

      if (productIndex > -1) {
        cart.products[productIndex].quantity += parsedQuantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: finalPrice,
          size: normalizedSize,
          color: normalizedColor,
          quantity: parsedQuantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Added to cart successfully",
        data: cart,
      });
    }

    // =============================
    // NO CART → CREATE NEW
    // =============================

    const cartData = {
      products: [
        {
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size: size || null,
          color: color || null,
          quantity: parsedQuantity,
        },
      ],
      totalPrice: product.price * parsedQuantity,
    };

    if (userId) {
      cartData.user = userId;
    } else {
      // Create guestId if not exists
      guestId =
        guestId ||
        `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      cartData.guestId = guestId;

      res.cookie("guestId", guestId, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      });
    }

    const newCart = await Cart.create(cartData);

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: newCart,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route PUT /api/cart
// @desc Update cart quantity for guest or logged-in user
// @access Public
cartRouter.put("/", optionalAuth, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body || {};

    if (!productId || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative number",
      });
    }

    const userId = req.user?._id || null;
    const guestId = req.cookies?.guestId || null;

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const normalizedSize = size || null;
    const normalizedColor = color || null;

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        (p.size || null) === normalizedSize &&
        (p.color || null) === normalizedColor,
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (parsedQuantity > 0) {
      cart.products[productIndex].quantity = parsedQuantity;
    } else {
      cart.products.splice(productIndex, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route DELETE /api/cart
// @desc Remove product from the cart
// @access Public
cartRouter.delete("/", optionalAuth, async (req, res) => {
  try {
    const { productId, size, color } = req.body || {};

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const userId = req.user?._id || null;
    const guestId = req.cookies?.guestId || null;

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.equals(productId) && p.size === size && p.color === color,
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.products.splice(productIndex, 1);

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Delete Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route GET /api/cart
// @desc Get logged-in users or guest user cart
// @access Public
cartRouter.get("/", optionalAuth, async (req, res) => {
  try {
    const userId = req.user?._id || null;
    const guestId = req.cookies?.guestId || null;

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          products: [],
          totalPrice: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart with users cart
// @access Private
cartRouter.post("/merge", userAuth, async (req, res) => {
  try {
    const userId = req.user?._id || null;
    const guestId = req.cookies?.guestId || null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    // Always get user cart first
    const userCart = await Cart.findOne({ user: userId });

    // If no guestId → nothing to merge
    if (!guestId) {
      return res.status(200).json({
        success: true,
        message: "No guest cart to merge.",
        data: userCart || { products: [], totalPrice: 0 },
      });
    }

    const guestCart = await Cart.findOne({ guestId });

    if (!guestCart) {
      return res.status(200).json({
        success: true,
        message: "No guest cart to merge",
        data: userCart || { products: [], totalPrice: 0 },
      });
    }

    // If user has no cart → assign guest cart
    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = undefined;

      await guestCart.save();

      res.clearCookie("guestId");

      return res.status(200).json({
        success: true,
        message: "Guest cart assigned to user successfully.",
        data: guestCart,
      });
    }

    // Merge products
    guestCart.products.forEach((guestItem) => {
      const existingIndex = userCart.products.findIndex(
        (item) =>
          item.productId.equals(guestItem.productId) &&
          item.size === guestItem.size &&
          item.color === guestItem.color,
      );

      if (existingIndex > -1) {
        userCart.products[existingIndex].quantity += guestItem.quantity;
      } else {
        userCart.products.push({
          productId: guestItem.productId,
          name: guestItem.name,
          image: guestItem.image,
          price: guestItem.price,
          size: guestItem.size,
          color: guestItem.color,
          quantity: guestItem.quantity,
        });
      }
    });

    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await userCart.save();

    await Cart.deleteOne({ guestId });

    res.clearCookie("guestId");

    return res.status(200).json({
      success: true,
      message: "Guest cart merged successfully.",
      data: userCart,
    });
  } catch (error) {
    console.error("Cart merge error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while merging cart.",
      error: error.message,
    });
  }
});

module.exports = cartRouter;
