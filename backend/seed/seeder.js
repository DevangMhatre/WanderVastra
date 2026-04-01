const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const products = require("../data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();

    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin@123",
      role: "admin",
    });

    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedData();
