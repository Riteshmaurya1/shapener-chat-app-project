const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const ArchivedMessage = sequelize.define("ArchivedMessage", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ArchivedMessage;
