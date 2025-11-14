const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Message = sequelize.define("Message", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;