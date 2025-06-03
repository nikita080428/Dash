import { Server } from "socket.io";
import mongoose from "mongoose";
import { Task } from "../models/tasks.models";
import { User } from "../models/users.model"

export default defineNitroPlugin(() => {
  const io = new Server(3001, {
    cors: { origin: "*" }
  });

  mongoose.connect("mongodb://localhost:27017/Dash");

  io.on("connection", (socket) => {
    console.log("Пользователь подключён");

    socket.on("create-task", async (taskData) => {
      try {

        if ( !taskData.title || !taskData.category ||
          !taskData.description || !taskData.createdBy
        ) {
          socket.emit("task-error", "Необходимо заполнить все обязательные поля.");
          return;
        }
        console.log(taskData)

        const newTask = new Task(taskData);
        await newTask.save(); 

        await User.updateOne(
          { _id: taskData.createdBy },
          { $push: { tasks: newTask._id } }
        ); 

        socket.emit("task-success", { success: true, data: newTask });


      } catch (err) {
        console.error(err);
        socket.emit("task-error", err.message);
      }
    });
  });
});
