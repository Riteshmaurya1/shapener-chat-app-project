require("dotenv").config();
const PORT = process.env.PORT || 4000;

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

const db = require("./src/Config/db-connection");
const socketIo = require("./src/socket_io");

// Some middlewares.
app.use(cors());
app.use(express.json());

// Socket.io Server....
socketIo(server);

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
