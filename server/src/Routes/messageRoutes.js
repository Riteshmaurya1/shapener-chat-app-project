const { jwtAuth } = require("../auth/jwt");
const { sendMessage } = require("../Controller/messageController");

const messageRouter = require("express").Router();

messageRouter.post("/send", jwtAuth, sendMessage);

module.exports = messageRouter;
