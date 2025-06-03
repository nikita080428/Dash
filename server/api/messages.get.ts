import { Message } from '../models/messages.models' 

export default defineEventHandler(async (event) => {
  const username = getQuery(event).username 
  let messages = await Message.find({ sender: username }).sort({ createdAt: 1 })
  console.log(messages)
  return messages
})
