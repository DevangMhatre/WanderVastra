const redisClient = require("./redisClient");

const clearProductCache = async () => {
  // ✅ guard for production
  if (!redisClient) {
    console.log("⚠️ Redis not available, skipping cache clear");
    return;
  }

  try {
    const keys = await redisClient.keys("products:*");

    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    console.log("🧹 Product cache cleared");
  } catch (err) {
    console.error("Redis cache clear error:", err.message);
  }
};

module.exports = { clearProductCache };
