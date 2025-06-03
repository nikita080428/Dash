import { User } from '../models/users.model';
import { Task } from '../models/tasks.models'; 
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); 
    
    try {
        
        const newTask = new Task({
        title: body.title,
        category: body.category,
        description: body.description,
        createdBy: body.createdBy,
        img: 'default',                    
        quest: body.quest || [],                        
        dueDate: body.dueDate || null,                  
        difficulty: body.difficulty || 'Средняя'       
        })
       

        await newTask.save();

        const userId = body.createdBy;

        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { tasks: newTask._id } },
            { new: true }
        );
        
        return {
            title: 'Задача создана',
            resutl: newTask
        };
    } catch(error) {
        console.error('Ошибка:', error);
        return false; // Возврат ошибки
    }
});