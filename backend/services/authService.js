const User = require("../models/User");
const AppError = require("../utils/AppError");

const redisClient = require("../utils/redisClient");

const register = async ({ name, email, password }) => {
  await redisClient.set("test", "hello");
  const value = await redisClient.get("test");

  console.log(value); // hello

  const normalizedEmail = email?.toLowerCase();

  try {
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    const token = user.getJWT();

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Email already exists", 409);
    }
    throw error;
  }
};

module.exports = { register };
