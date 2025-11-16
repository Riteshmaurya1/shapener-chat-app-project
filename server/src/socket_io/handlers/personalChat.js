module.exports = (socket, io) => {
  socket.on("join-room", ({ roomName }) => {
    socket.join(roomName);
    console.log(`${socket.user.username} joined ${roomName}`);
  });

  socket.on("new-message", ({ message, roomName }) => {
    console.log(`User : ${socket.user.username} -- Message : ${message}`);

    // if want send message itself.
    // io.to(roomName).emit("new-message", {

    // if don't want send message itself.
    socket.to(roomName).emit("new-message", {
      username: socket.user.username,
      message,
    });
  });
};
