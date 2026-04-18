const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDB = require("./config/db");
const userRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const orderRouter = require("./routes/order");
const uploadRouter = require("./routes/upload");
const subscribeRouter = require("./routes/subscribe");
const adminRouter = require("./routes/admin");
const productAdminRouter = require("./routes/productAdmin");
const orderAdminRouter = require("./routes/orderAdmin");
const webhookRouter = require("./routes/webhook");
// Error Handling
const errorHandler = require("./middlewares/error");
// Logging
const requestLogger = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://wander-vastra-dv7f.vercel.app",
  "https://wander-vastra-dv7f-p80y8mblx-mhatre-devangs-projects.vercel.app",
  "https://wander-vastra.vercel.app",
  "https://www.wastrawear.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Log
app.use(requestLogger);

app.use("/api/webhooks", express.raw({ type: "application/json" }));
// Webhook
app.use("/api/webhooks", webhookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to WastraWear API");
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/users", profileRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", orderAdminRouter);

// Error Handling
app.use(errorHandler);

connectDB()
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection failed: " + err.message);
  });
