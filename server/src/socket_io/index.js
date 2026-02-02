const { Server } = require("socket.io");
const socketAuth = require("./middleware.js");
const chatHandler = require("./handlers/chat");
const personal_chat = require("./handlers/personalChat.js");
const group_chat = require("./handlers/groupChat.js");

module.exports = (server) => {
  // Track online users: Map<userId, socketId>
  const onlineUsers = new Map();

  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? false
          : ["http://127.0.0.1:5500", "http://localhost:3000", "http://localhost:5500"], // Added localhost:5500
    },
  });
  // socket authentication
  socketAuth(io);

  // Socket.io events.... handshake
  io.on("connection", (socket) => {
    console.log(`${socket.id} : User Connected 💖`);

    // 1. Status: Register user as online
    if (socket.user && socket.user.id) {
      onlineUsers.set(socket.user.id, socket.id);
      // Broadcast to everyone that this user is online
      io.emit("user-status", { userId: socket.user.id, status: "online" });

      // Send list of currently online users to the new connector
      const onlineIds = Array.from(onlineUsers.keys());
      socket.emit("active-users", onlineIds);
    }

    // Personal chats groups
    personal_chat(socket, io);

    // public group chats
    group_chat(socket, io);

    // 3. Group Invitations
    socket.on("add-members", ({ memberIds }) => {
      // memberIds is array of user IDs
      memberIds.forEach(targetId => {
        if (onlineUsers.has(targetId)) {
          const targetSocketId = onlineUsers.get(targetId);
          io.to(targetSocketId).emit("new-group-invite");
        }
      });
    });

    // 2. Typing Events
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

    // Disconnect
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
