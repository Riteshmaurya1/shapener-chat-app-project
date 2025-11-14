const Message = require("../Model/message");

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
      message: "Message Sent",
      createdMessage,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  sendMessage,
};
