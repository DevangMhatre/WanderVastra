const AppError = require("../utils/AppError");
const validateSignUpData = require("../utils/validation");

const validateRegister = (req, res, next) => {
  try {
    validateSignUpData(req.body);
    next();
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

module.exports = { validateRegister };
