import { User } from '../models/users.model'; 
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); 
    
    try {
        let users = await User.find({ email: body.email });
        
        if (users.length > 0) {
            return users[0]; 
        }
        
        const newUser = new User({
            nickname: body.nickname,
            email: body.email,
            password: body.password,
        });     

        await newUser.save();
        
        return newUser;
    } catch(error) {
        console.error('Ошибка:', error);
        return false; // Возврат ошибки
    }
});