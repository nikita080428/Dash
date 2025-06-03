<script setup>
import { useAuthStore } from '@/stores/auth';
definePageMeta({
    middleware: ["auth"]
})

const friends = ref([])
const chats = ref([])
const activeChatId = ref(null)
const newMessage = ref('')
const currentUserId = ref(0)
const showFriendSelector = ref(false)
const newChatTitle = ref('')
const selectedChatType = ref(null) 

const activeChat = computed(() => {
  return chats.value.find(c => c.id === activeChatId.value)
})

watchEffect(async () => {
  try {
    const fetchedUsers = await $fetch("/api/users", {
      method: 'GET',
    });
    friends.value = fetchedUsers; 
  } catch (error) {
    console.log(error)
  }
});

function createNewChat(isGroup = false) {
  const newChat = {
    id: Date.now(),
    title: isGroup ? 'Новая группа' : 'Новый чат',
    participants: [],
    messages: [],
    isGroup
  }
  
  chats.value.unshift(newChat)
  activeChatId.value = newChat.id
  showFriendSelector.value = true
  selectedChatType.value = isGroup ? 'group' : 'private'
}

function addFriendToChat(friendName) {
  if (!activeChat.value) return
  
  const existingParticipantNames = activeChat.value.participants.map(participant => participant.name)
  if (!existingParticipantNames.includes(friendName)) {
    activeChat.value.participants.push({ name: friendName })
    
    if (selectedChatType.value === 'private') {
      activeChat.value.title = friendName
      closeFriendSelector()
    }
  }
}

function closeFriendSelector() {
  showFriendSelector.value = false
  newChatTitle.value = ''
}

function deleteChat(chatId) {
  chats.value = chats.value.filter(chat => chat.id !== chatId)
  if (activeChatId.value === chatId) {
    activeChatId.value = chats.value[0]?.id || null
  }
}

function sendMessage() {
  if (!newMessage.value.trim() || !activeChat.value) return
  
  const message = {
    text: newMessage.value,
    senderId: currentUserId.value,
    timestamp: new Date(),
    isRead: false
  }
  
  activeChat.value.messages.push(message)
  newMessage.value = ''
}
</script>

<template>
  <main class="flex h-screen bg-gray-50">
    <aside class="w-64 bg-white border-r p-4 flex flex-col">
      <div class="flex gap-2 mb-4">
        <button 
          @click="createNewChat(false)"
          class="flex-1 p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Новый чат
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          @click="activeChatId = chat.id"
          :class="{ 'bg-gray-100': activeChatId === chat.id }"
          class="group flex items-center justify-between p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <div class="flex items-center">
            <div v-if="chat.isGroup" class="mr-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white">
              Г
            </div>
            <div v-else class="mr-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {{ chat.participants[0]?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <div class="truncate">
              <div class="font-medium">{{ chat.title }}</div>
              <div v-if="chat.messages.length > 0" class="text-xs text-gray-500 truncate">
                {{ chat.messages[chat.messages.length-1].text }}
              </div>
              <div v-else class="text-xs text-gray-500">Нет сообщений</div>
            </div>
          </div>
          <button 
            @click.stop="deleteChat(chat.id)"
            class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      </div>
    </aside>
    <div class="flex-1 flex flex-col">
      <header v-if="activeChat" class="border-b p-4 flex items-center justify-between">
        <div class="flex items-center">
          <div v-if="activeChat.isGroup" class="mr-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
            Г
          </div>
          <div v-else class="mr-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {{
              activeChat.participants[0]?.name?.charAt(0).toUpperCase() || '?'
            }}
          </div>
          <div>
            <h2 class="font-bold">{{ activeChat.title }}</h2>
            <div v-if="activeChat.isGroup" class="text-xs text-gray-500">
              {{ activeChat.participants.length }} участника
            </div>
          </div>
        </div>
      </header>
      <div v-if="activeChat" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div 
          v-for="(message, index) in activeChat.messages"
          :class="[message.senderId === currentUserId ? 'ml-auto bg-black text-white' : 'bg-white']"
          class="max-w-3xl p-4 rounded-xl shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div 
              v-if="message.senderId !== currentUserId"
              class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              {{
                activeChat.participants.find(p => p.name === message.senderId)?.name?.charAt(0).toUpperCase() || '?'
              }}
            </div>
            <div class="flex-1">
              <p class="whitespace-pre-wrap">{{ message.text }}</p>
              <div class="text-xs mt-1 opacity-70">
                {{ message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showFriendSelector" class="p-4 border-t">
        <div class="max-w-3xl mx-auto">
          <input
            v-if="selectedChatType === 'group'"
            v-model="newChatTitle"
            @input="activeChat.title = newChatTitle"
            placeholder="Название группы"
            class="w-full p-2 mb-2 border rounded-lg"
          />
          
          <div class="grid grid-cols-3 gap-2 mb-2">
            <button
              v-for="friend in friends"
              @click="addFriendToChat(friend)"
              class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {{ friend }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="activeChat && !showFriendSelector" class="p-4 border-t">
        <form 
          @submit.prevent="sendMessage"
          class="max-w-3xl mx-auto flex gap-2"
        >
          <input
            v-model="newMessage"
            placeholder="Напишите сообщение..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Отправить
          </button>
        </form>
      </div>
      <div v-if="!activeChat" class="flex-1 flex items-center justify-center">
        <div class="text-center p-8">
          <h3 class="text-xl font-bold mb-2">Нет активного чата</h3>
          <p class="text-gray-500 mb-4">Выберите существующий чат или создайте новый</p>
          <button 
            @click="createNewChat(false)"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Создать чат
          </button>
        </div>
      </div>
    </div>
  </main>
</template>