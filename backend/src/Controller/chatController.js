const express = require("express");

const { Chat } = require("../models/chat");

const {auth}=require("../Middleware/auth")

const chatRouter = express.Router();

chatRouter.get("/chat/:requestId", auth, async (req, res) => {
  try {
    const {requestId }= req.params;

    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, requestId] },
    }).populate({path:"messages.senderId",
      select:"firstName lastName"
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, requestId],
        messages: [],
      });

      await chat.save();
    }

    res.json(chat);
  } catch (err) {
   console.log(err)
  }
});

module.exports = chatRouter;
