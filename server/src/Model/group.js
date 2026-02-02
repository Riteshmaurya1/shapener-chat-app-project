const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const Group = sequelize.define("Group", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

module.exports = Group;
