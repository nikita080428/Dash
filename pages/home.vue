<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
definePageMeta({
    middleware: ["auth"]
})
import { io } from "socket.io-client"
const socket = io("http://localhost:3001")

const messages = ref([])
const authStore = useAuthStore();
const message = ref("")
const username = ref("User1")
let tasks = ref([]); 


watchEffect(async () => {
  try {
    const fetchedTasks = await $fetch("/api/allTask", {
      method: 'POST',
      body: {
        taskIds: authStore.getInfo().tasks
      }
    });
    tasks.value = fetchedTasks;
    console.log(tasks.value)
  } catch (error) {
    console.log(error)
  }
});
</script>

<template>
  <div class="h-screen">
    <header class="flex items-center justify-between mb-8 px-4 py-3 bg-white shadow-sm">
    <h2 class="text-2xl font-semibold text-gray-800">Главная</h2>
    
    <div class="relative flex items-center gap-3">
      <input 
        type="text" 
        placeholder="Поиск отключён"
        class="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent "
      >
      <img :src="`search.png`"
        class="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none"  >
    </div>
  </header>

  <div class="flex justify-between items-center mb-8 px-4">
    <h3 class="text-lg font-medium text-gray-700">Метрики</h3>
  </div>

  <section class="grid  gap-6 px-4">
    <MetrikoInfo :tasks="authStore.getInfo().tasks"/>

  </section>

  <div class="flex justify-between items-center my-8 px-4">
    <h3 class="text-lg font-medium text-gray-700">Недавнее</h3>
  </div>

  <section class="grid grid-cols-3 gap-6 px-4">
    <CardElement v-for="{_id, title, category, img, dueDate} in tasks" :_id :title :category :img :dueDate  />
  </section>
  </div>
  
</template>
