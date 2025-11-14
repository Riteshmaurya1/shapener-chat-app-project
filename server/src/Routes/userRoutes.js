const { jwtAuth } = require("../auth/jwt");
const { signup, signin } = require("../Controller/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter;
