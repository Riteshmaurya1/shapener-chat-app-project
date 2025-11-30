const cron = require("node-cron");
const { Op } = require("sequelize");
const Message = require("../Model/message");
const ArchivedMessage = require("../Model/messageArchived");

async function archiveOldMessages() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Step 1: Get messages older than 1 day
  const oldMessages = await Message.findAll({
    where: {
      createdAt: { [Op.lt]: oneDayAgo },
    },
  });

  if (!oldMessages.length) return;
  console.log(oldMessages);

  // 2. Insert into ArchivedMessage
  const plain = oldMessages.map((m) => m.toJSON());
  await ArchivedMessage.bulkCreate(plain);

  // 3. Delete from Message
  await Message.destroy({
    where: {
      createdAt: { [Op.lt]: oneDayAgo },
    },
  });
}

// run every night at 2 AM like Min/Hour(24)/Day/Month/Year
cron.schedule("0 2 * * *", archiveOldMessages);

module.exports = { archiveOldMessages };
