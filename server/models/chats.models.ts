import mongoose, { Schema, model } from "mongoose";

const chatSchema = new mongoose.Schema({
  name: String,
  isGroup: {type: Boolean, default: false},
  participants: [{type: Schema.Types.ObjectId, ref: 'User', required: true  }],
  lastMessage: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestamps: true})

export const Chat = mongoose.model('Chat', chatSchema)
