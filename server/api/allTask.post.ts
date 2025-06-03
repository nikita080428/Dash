import { Task } from '../models/tasks.models';
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const taskIds = body.taskIds;

        const foundTasks = await Task.find({ _id: { $in: taskIds } }).exec();

        return foundTasks;
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
});