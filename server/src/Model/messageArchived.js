const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const ArchivedMessage = sequelize.define("ArchivedMessage", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ArchivedMessage;
