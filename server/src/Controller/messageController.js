const Message = require("../Model/message");
const {getSmartReplies} = require('../Services/geminiService')

// ****************** Send Meaage Logic *************//
const sendMessage = async (req, res) => {
  try {
    // step1: get userId from payload and message from body.
    const userId = req.payload.id;
    const { message } = req.body;
    if (!message) {
      return res.status(401).json({
        message: "Please enter message",
      });
    }
    // Step2: save message to the DB.
    const createdMessage = await Message.create({ userId, message });

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

    // Step2: get message from DB.
    const messages = await Message.findAll({
      where: { userId },
    });

    // Step3: For getting Ai chat response.
    let aiReplies = [];
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      aiReplies = await getSmartReplies(last.message);
    }

    return res.status(200).json({
      message: "Sent",
      messages,
      aiReplies
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
