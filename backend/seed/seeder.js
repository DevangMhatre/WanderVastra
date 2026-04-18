const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("../data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// 🔹 Normalize helper
const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

const seedData = async () => {
  try {
    await Product.deleteMany();

    // ✅ safe user creation
    let user = await User.findOne({ email: "admin@gmail.com" });

    if (!user) {
      user = await User.create({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin@123",
        role: "admin",
      });
    }

    const userID = user._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: userID,

        // ✅ normalize fields BEFORE saving
        category: normalize(product.category),
        collections: normalize(product.collections),

        // optional (only if needed later)
        material: product.material?.trim(),
        brand: product.brand?.trim(),

        // colors stay same (already structured)
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("✅ Product data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
