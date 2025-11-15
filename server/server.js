require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const db = require("./src/Config/db-connection");
const http = require("http");
const { Server } = require("socket.io");

// Some middlewares.
app.use(cors());
app.use(express.json());

// Create HTTP + Socket.io Server....
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

// Import Models
require("./src/Model/user");
require("./src/Model/message");

// import Routers
const userRouter = require("./src/Routes/userRoutes");
const messageRouter = require("./src/Routes/messageRoutes");

// Default routes
app.get("/", (req, res) => {
  res.send("this is home route");
});

// Making custom Routes
app.use("/user", userRouter);
app.use("/message", messageRouter);

// Socket.io events....
io.on("connection", (socket) => {
  console.log(`${socket.id} : User Connected 💖`);

  socket.on("send-message", (message) => {
    console.log(`User : ${socket.id} -- Message : ${message}`);
    socket.broadcast.emit("receive-message", message);
  });
});

(async () => {
  try {
    await db.sync({ force: false });
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
