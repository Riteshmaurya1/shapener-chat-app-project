require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const logger = require("./src/Config/logger");

const db = require("./src/Config/db-connection");
const socketIo = require("./src/socket_io/index");

// Some middlewares.
app.use(cors());
app.use(express.json());

// Socket.io Server....
socketIo(server);

// Import Models
require("./src/Model/groupMember");
require("./src/Services/messageArchiveService");

const User = require("./src/Model/user");
const Message = require("./src/Model/message");
const Group = require("./src/Model/group");
const GroupMember = require("./src/Model/groupMember");

// Define Associations
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });

Group.hasMany(Message, { foreignKey: 'groupId' });
Message.belongsTo(Group, { foreignKey: 'groupId' });


// import Routers
const userRouter = require("./src/Routes/userRoutes");
const messageRouter = require("./src/Routes/messageRoutes");
const groupRouter = require("./src/Routes/groupRoutes");

// Default routes
app.get("/", (req, res) => {
  res.send("this is home route");
});

app.get("/health-check", async (req, res) => {
  try {
    await User.sequelize.authenticate();
    res.status(200).json({
      message: "All good",
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server is running",
      status: "error",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Making custom Routes
app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use("/group", groupRouter);
app.use("/file", require("./src/Routes/fileRoutes"));

(async () => {
  try {
    // Disabled alter: true to avoid 'Too many keys' error
    await db.sync();
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
})();
