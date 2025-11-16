const { Server } = require("socket.io");
const socketAuth = require("./middleware.js");
const chatHandler = require("./handlers/chat");
const personal_chat = require("./handlers/personalChat.js");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? false
          : ["http://127.0.0.1:5500", "http://localhost:3000"],
    },
  });
  // public chats
  socketAuth(io);

  // Personal chats
  personal_chat(io);

  // Socket.io events.... handshake
  io.on("connection", (socket) => {
    console.log(`${socket.id} : User Connected 💖`);
    chatHandler(socket, io);
  });

  return io;
};
