const jwtAuth = require("../Middleware/verifyJwt");
const { signup, signin, getUsers } = require("../Controller/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/all", jwtAuth, getUsers);

module.exports = userRouter;
