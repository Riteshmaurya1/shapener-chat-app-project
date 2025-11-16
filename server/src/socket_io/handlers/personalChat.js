module.exports = (socket, io) => {
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
  });

  socket.on("new-message", ({ message, roomName }) => {
    console.log(`User : ${socket.user.username} -- Message : ${message}`);

    io.emit("new-message", { username: socket.user.username }, message);
  });
};
