const validator = require("validator");

const validateSignUpData = (data = {}) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

module.exports = validateSignUpData;
