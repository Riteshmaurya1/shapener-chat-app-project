const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Message = sequelize.define("Message", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null if sending only image
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Message;