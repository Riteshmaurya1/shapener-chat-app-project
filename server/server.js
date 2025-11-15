require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const db = require("./src/Config/db-connection");
const http = require("http");
const WebSocket = require("ws");

// Some middlewares.
app.use(cors());
app.use(express.json());

// Create HTTP + Web Socket Server....
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

// Web Socket events....
let sockets = [];
wss.on("connection", (ws) => {
  console.log("Client Connected");
  sockets.push(ws);
  
  // Board Cast
  ws.on("message", (message) => {
    sockets.forEach((s) => {
      s.send(message);
    });
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
