const { jwtAuth } = require("../auth/jwt");
const { sendMessage, getMessage } = require("../Controller/messageController");

const messageRouter = require("express").Router();

messageRouter.post("/send", jwtAuth, sendMessage);
messageRouter.get("/receive", jwtAuth, getMessage);

module.exports = messageRouter;
