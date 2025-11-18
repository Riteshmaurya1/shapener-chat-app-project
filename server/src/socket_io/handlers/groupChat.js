// module.exports = (socket, io) => {
//   socket.on("group-chat", ({ groupName } = {}) => {
//     if (!groupName) {
//       console.log(`${socket.user.username} connected but no group joined yet`);
//       return;
//     }
//     socket.join(groupName);
//     console.log(`${socket.user.username} joined ${groupName}`);
//   });

//   socket.on("group-messages", ({ message, groupName }) => {
//     console.log(`User : ${socket.user.username} -- Message : ${message}`);
//     // if don't want send message itself.
//     socket.to(groupName).emit("group-messages", {
//       username: socket.user.username,
//       message,
//     });
//   });
// };

module.exports = (socket, io) => {
  socket.on("group-chat", ({ groupName } = {}) => {
    if (!groupName) {
      console.log(`${socket.user.username} connected but no group joined yet`);
      return;
    }
    socket.join(groupName);
    socket.currentRoom = groupName; // Track current room
    console.log(`${socket.user.username} joined ${groupName}`);
  });

  socket.on("group-messages", ({ message, groupName } = {}) => {
    if (!message || !groupName) return;
    
    console.log(`User: ${socket.user.username} -- Message: ${message}`);
    
    socket.to(groupName).emit("group-messages", {
      username: socket.user.username,
      message,
    });
  });

  // Simple disconnect handler
  socket.on("disconnect", () => {
    console.log(`${socket.user.username} disconnected`);
  });
};
