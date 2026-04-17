const express = require("express");
const axios = require("axios");

const { userAuth } = require("../middlewares/auth");
const Cart = require("../models/Cart");

const checkoutRouter = express.Router();

// @route POST /api/checkout/create-checkout
// @desc Create a new checkout session
// @access Private
checkoutRouter.post("/create-checkout", userAuth, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const cartTotal = Math.round(cart.totalPrice * 100); // paise

    const response = await axios.post(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: req.user.email,
              custom: {
                userId: req.user._id.toString(),
                cartId: cart._id.toString(),
                shippingAddress: JSON.stringify(shippingAddress),
              },
            },

            custom_price: cartTotal,

            product_options: {
              redirect_url: `${process.env.CLIENT_URL}/payment-success`,
            },
          },

          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.STORE_ID,
              },
            },

            variant: {
              data: {
                type: "variants",
                id: process.env.VARIANT_ID,
              },
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,
      checkoutUrl: response.data.data.attributes.url,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Checkout creation failed",
    });
  }
});

module.exports = checkoutRouter;

// checkoutRouter.post("/create-checkout", userAuth, async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://api.lemonsqueezy.com/v1/checkouts",
//       {
//         data: {
//           type: "checkouts",
//           attributes: {
//             checkout_data: {
//               email: req.user.email,
//             },
//             product_options: {
//               redirect_url: `${process.env.CLIENT_URL}/payment-success`,
//             },
//           },
//           relationships: {
//             store: {
//               data: {
//                 type: "stores",
//                 id: process.env.STORE_ID,
//               },
//             },
//             variant: {
//               data: {
//                 type: "variants",
//                 id: process.env.VARIANT_ID,
//               },
//             },
//           },
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     res.json({
//       success: true,
//       checkoutUrl: response.data.data.attributes.url,
//     });
//   } catch (error) {
//     console.error("Lemon error:", error.response?.data || error.message);

//     res.status(500).json({
//       success: false,
//       message: "Checkout creation failed",
//     });
//   }
// });
