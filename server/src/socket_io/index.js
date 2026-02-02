const { Server } = require("socket.io");
const socketAuth = require("./middleware.js");
const chatHandler = require("./handlers/chat");
const personal_chat = require("./handlers/personalChat.js");
const group_chat = require("./handlers/groupChat.js");

module.exports = (server) => {
  const onlineUsers = new Map();

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });
  socketAuth(io);

  io.on("connection", (socket) => {
    console.log(`${socket.id} : User Connected 💖`);

    if (socket.user && socket.user.id) {
      onlineUsers.set(socket.user.id, socket.id);
      io.emit("user-status", { userId: socket.user.id, status: "online" });

      const onlineIds = Array.from(onlineUsers.keys());
      socket.emit("active-users", onlineIds);
    }

    personal_chat(socket, io);

    group_chat(socket, io);

    socket.on("add-members", ({ memberIds }) => {
      memberIds.forEach(targetId => {
        if (onlineUsers.has(targetId)) {
          const targetSocketId = onlineUsers.get(targetId);
          io.to(targetSocketId).emit("new-group-invite");
        }
      });
    });

    socket.on("typing", ({ receiverId, groupId }) => {
      if (groupId) {
        socket.to(groupId).emit("typing", { userId: socket.user.id, groupId });
      } else if (receiverId) {
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing", { userId: socket.user.id });
        }
      }
    });

    socket.on("stop-typing", ({ receiverId, groupId }) => {
      if (groupId) {
        socket.to(groupId).emit("stop-typing", { userId: socket.user.id, groupId });
      } else if (receiverId) {
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("stop-typing", { userId: socket.user.id });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
      if (socket.user && socket.user.id) {
        onlineUsers.delete(socket.user.id);
        io.emit("user-status", { userId: socket.user.id, status: "offline" });
      }
    });
  });

  return io;
};
