module.exports = (socket, io) => {
  socket.on("join-room", ({ roomName }) => {
    socket.join(roomName);
    console.log(`${socket.user.username} joined ${roomName}`);
  });

  socket.on("new-message", ({ message, roomName, attachmentUrl }) => {
    console.log(`User : ${socket.user.username} -- Message : ${message || "[Image]"}`);

    socket.to(roomName).emit("new-message", {
      username: socket.user.username,
      message,
      attachmentUrl
    });
  });
};
