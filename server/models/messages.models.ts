import mongoose, { Schema, model } from "mongoose";

const messageSchema = new mongoose.Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true},
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  content: String,
  readBy: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema)
