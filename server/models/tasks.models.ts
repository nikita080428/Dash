import mongoose, { Schema, model } from "mongoose";

const taskSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
 },
 time: {
    type: Number, // Пока что буду считать в часах
 },
 img: String,
 description: {
    type: String,
    required: true,
 },
 createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 quest: [{
    title: {
        type: String,
    },
    completed: Boolean
 }],
 Date: Date,

})

export const Task = mongoose.model('Task', taskSchema)





