const express = require("express");
const Subscriber = require("../models/Subscriber");

const subscribeRouter = express.Router();

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public

subscribeRouter.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    // Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already subscribed" });
    }

    subscriber = await Subscriber.create({ email });

    return res
      .status(200)
      .json({ success: true, message: "Subscribed Successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = subscribeRouter;
