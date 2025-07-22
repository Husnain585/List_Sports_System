const socket = require("socket.io");
const { Chat } = require("../Models/Chat");

const initialaizedSocketio = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ name, userId, requestId }) => {
      const roomId = [userId, requestId].sort().join("_");
      console.log(`${name} joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ name, userId, requestId, text }) => {
      const roomId = [userId, requestId].sort().join("_");
      console.log(`${name}: ${text}`);

      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, requestId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, requestId],
            messages: [],
          });
        }

        const message = {
          senderId: userId,
          text,
        };

        chat.messages.push(message);
        await chat.save(); // Save to MongoDB

        io.to(roomId).emit("messageReceived", {
          name,
          text,
          senderId: userId,
        });
      } catch (err) {
        console.error("Error saving message to database:", err);
      }
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initialaizedSocketio;
