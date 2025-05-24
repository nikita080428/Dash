import mongoose, { Schema, model } from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task'
    }],
    teams: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Team'
    }],
    notification : [{
        title: {type: String},
        type: String,
        task: {
            type: Schema.Types.ObjectId, 
            ref: 'Task'
        },
        read: {
            type: Boolean,
            default: false
        },
    }],


})

export const User = mongoose.model('User', userSchema)





