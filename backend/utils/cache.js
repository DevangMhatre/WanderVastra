const redisClient = require("./redisClient");

const clearProductCache = async () => {
  const keys = await redisClient.keys("products:*");

  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  console.log("🧹 Product cache cleared");
};

module.exports = { clearProductCache };
