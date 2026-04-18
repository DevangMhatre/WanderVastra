const winston = require("winston");

const transports = [
  new winston.transports.Console(), // ✅ always safe
];

// ❗ Only use file logging in local/dev
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  );
}

const logger = winston.createLogger({
  level: "info",
  transports,
});

module.exports = logger;
