import mongoose, { Schema, model } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Домашние дела', 'Учеба', 'Стажировка/Курсы'], 
    required: true 
  },
  img: {
    type: String,
    default: 'default'
  },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quest: [{
    title: String,
    completed: { type: Boolean, default: false }
  }],
  dueDate: Date,
  difficulty: { 
    type: String, 
    enum: ['Лёгкая', 'Средняя', 'Сложная'], 
    default: 'Средняя' 
  }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema)





