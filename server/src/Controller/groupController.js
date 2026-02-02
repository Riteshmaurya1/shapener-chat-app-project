const Group = require("../Model/group");
const GroupMember = require("../Model/groupMember");
const { Op } = require("sequelize");

exports.createGroup = async (req, res) => {
    try {
        const { name, memberIds } = req.body; // memberIds: array of strings
        const creatorId = req.payload.id; // Provided by auth middleware

        if (!name || !memberIds || memberIds.length === 0) {
            return res.status(400).json({ message: "Group name and members are required" });
        }

        // Create Group
        const group = await Group.create({
            name,
            creatorId,
        });

        // Prepare members: creator + selected members
        // Ensure uniqueness
        const allMemberIds = [...new Set([...memberIds, creatorId])];

        const memberRecords = allMemberIds.map((uid) => ({
            groupId: group.id,
            userId: uid
        }));

        await GroupMember.bulkCreate(memberRecords);

        return res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getUserGroups = async (req, res) => {
    try {
        const userId = req.payload.id;
        console.log("Fetching groups for UserID:", userId);

        // Find all groups where this user is a member
        const memberships = await GroupMember.findAll({
            where: { userId },
            attributes: ['groupId']
        });
        console.log("Found Memberships:", memberships.length);

        const groupIds = memberships.map(m => m.groupId);

        const groups = await Group.findAll({
            where: {
                id: {
                    [Op.in]: groupIds
                }
            }
        });

        return res.status(200).json({ groups });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.payload.id;
        console.log(`Attempting to delete group ${groupId} by user ${userId}`);

        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Only creator can delete
        // Note: For simplicity, checking strict equality. 
        // Ensure both are strings or compare appropriately.
        if (group.creatorId !== userId) {
            return res.status(403).json({ message: "Only the group creator can delete this group" });
        }

        // Delete Members first
        await GroupMember.destroy({
            where: { groupId }
        });

        // Delete Group
        await group.destroy();

        return res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
