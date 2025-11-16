const jwt = require("jsonwebtoken");

const generateJwtToken = (userData) => {
  // generate a new jwt token using user data.
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 86400 });
};

module.exports = {
  generateJwtToken,
};
