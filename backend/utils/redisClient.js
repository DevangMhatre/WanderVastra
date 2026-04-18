const { createClient } = require("redis");

let redisClient = null;

if (process.env.NODE_ENV !== "production") {
  redisClient = createClient({
    url: "redis://localhost:6379",
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err.message);
  });

  (async () => {
    try {
      await redisClient.connect();
      console.log("✅ Redis connected");
    } catch (err) {
      console.log("⚠️ Redis connection failed");
    }
  })();
} else {
  console.log("⚠️ Redis disabled in production");
}

module.exports = redisClient;
