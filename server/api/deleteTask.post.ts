import { Task } from '../models/tasks.models';
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const result = await Task.deleteOne({ _id: body._id }).exec();

        return true;
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
});