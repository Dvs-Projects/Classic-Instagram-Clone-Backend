const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const userId = req.uid;
    const messagesUser = req.params.from;

    const last30 = await Message.find({
      $or: [
        { from: userId, to: messagesUser },
        { from: messagesUser, to: userId },
      ],
    }).sort({ createdAt: 'desc' });

    res.json({
      last30,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMessages,
};
