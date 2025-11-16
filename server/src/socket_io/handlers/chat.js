module.exports = (socket, io) => {
  socket.on("send-message", (message) => {
    console.log(`User : ${socket.user.username} -- Message : ${message}`);
    socket.broadcast.emit(
      "receive-message",
      { username: socket.user.username },
      message
    );
  });
};
