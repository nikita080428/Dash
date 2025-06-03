import { User } from '../models/users.model' // подгружаем модель

export default defineEventHandler(async (event) => {
    try{
        const body = await readBody(event)
        let user = await User.find({
            email: body.email,
            password: body.password
        })
  
        return user[0]
    } catch{
        return false
    }
  
})
