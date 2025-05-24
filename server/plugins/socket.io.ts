import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message } from "../models/message.model";

export default defineNitroPlugin(() => {
  const io = new Server(3001, {
    cors: { origin: "*" }
  });

  mongoose.connect("mongodb://localhost:27017/chat");

  io.on("connection", (socket) => {
    console.log("Пользователь подключён");

    socket.on("message", async (data) => {
      const msg = new Message(data);
      await msg.save();
      io.emit("message", msg);
    });
  });
});
