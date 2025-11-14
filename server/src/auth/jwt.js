const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  // first we check the authorization
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "Token not found",
    });
  }
  // Extarct the token from the authorization header.
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  try {
    // Verify the JWT Token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to the req object
    req.payload = decode;
    next();
  } catch (err) {
    res.status(401).json({
      err: err.message,
      success: false,
    });
  }
};

const generateJwtToken = (userData) => {
  // generate a new jwt token using user data.
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 86400 });
};

module.exports = {
  jwtAuth,
  generateJwtToken,
};
