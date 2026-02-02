const Message = require("../Model/message");
const User = require("../Model/user");


// ****************** Send Message Logic *************//
const sendMessage = async (req, res) => {
  try {
    // step1: get userId from payload and message from body.
    const userId = req.payload.id;
    const { message, receiverId, groupId, attachmentUrl } = req.body; // Updated to accept attachmentUrl

    // Allow message OR attachment. If both missing, error.
    if (!message && !attachmentUrl) {
      return res.status(401).json({
        message: "Please enter message or send an attachment",
      });
    }
    // Step2: save message to the DB.
    const createdMessage = await Message.create({
      userId,
      message: message || null, // Allow null message if attachment exists
      receiverId: receiverId || null,
      groupId: groupId || null,
      attachmentUrl: attachmentUrl || null
    });

    // Step3: retur response
    return res.status(201).json({
      message: "Sent",
      createdMessage,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// ******************* Receive Message Logic ****************//
const getMessage = async (req, res) => {
  try {
    // Step1: get userId from payload.
    const userId = req.payload.id;
    const { receiverId, groupId } = req.query; // Updated to get filters from query

    let whereClause = {};

    if (groupId) {
      // Group Chat: Messages in this group
      whereClause = { groupId };
    } else if (receiverId) {
      // Private Chat: Messages between me and receiver (both directions)
      const { Op } = require("sequelize");
      whereClause = {
        [Op.or]: [
          { userId: userId, receiverId: receiverId },
          { userId: receiverId, receiverId: userId }
        ]
      };
    } else {
      // Fallback: Just return messages sent by user (legacy behavior or maybe empty?)
      // For now, let's keep it restricted or it might dump everything confusingly.
      // Current legacy behavior was: where: { userId } which only showed sent items.
      whereClause = { userId };
    }

    // Step2: get message from DB.
    const messages = await Message.findAll({
      where: whereClause,
      order: [['createdAt', 'ASC']], // Ensure chronological order
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    // Step3: For getting Ai chat response.
    // AI Logic Removed

    return res.status(200).json({
      message: "Sent",
      messages
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
