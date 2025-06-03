import { User } from '../models/users.model';

export default defineEventHandler(async (event) => {
    try {
        const users = await User.find({}, 'nickname').lean();
        return users.map(user => user.nickname); 
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
});