import { Message } from '../../models/message.model' // подгружаем модель

export default defineEventHandler(async (event) => {
  const username = getQuery(event).username // достаём имя из параметров запроса
  let messages = await Message.find({ sender: username }).sort({ createdAt: 1 })
  console.log(messages)
  return messages
})
