const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db-connection");

const GroupMember = sequelize.define("GroupMember", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    groupId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
});

module.exports = GroupMember;
