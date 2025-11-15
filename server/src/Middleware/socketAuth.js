const User = require("../Model/user");
const jwt = require("jsonwebtoken");

const socketAuth = async (socket, next) => {
  try {
    // Extarct the token from the client.
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication token is missing."));
    }

    // Verify the JWT Token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return next(new Error("Invalid or expired token."));
    }

    const user = await User.findByPk(decode.id);
    if (!user) {
      return next(new Error("User not found"));
    }
    // attach user info to the req object
    socket.user = user;
    next();
  } catch (err) {
    return next(new Error("Internal Server Error."));
  }
};

module.exports = socketAuth;
