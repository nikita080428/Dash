<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const active = ref(route.path)
console.log(active.value)

watch(
  () => route.path,
  (newPath) => {
    active.value = newPath
    console.log('Активный путь обновлен:', active.value)
  }
)

const showLogoutModal = ref(false)

const handleLogout = () => {
  // Логика выхода из аккаунта
  console.log('User logged out')
  showLogoutModal.value = false
}

const menuItems = [
  { img: 'home', title: 'Главная' },
  { img: 'team', title: 'Команда' },
  { img: 'task', title: 'Задачи' },
  { img: 'message', title: 'Сообщения' },
  { img: 'notification', title: 'Уведомление' },
  { img: 'file', title: 'Файлы', type: 'section' },
  { img: 'setting', title: 'Настройки', type: 'section' },
]

</script>

<template>
  <div class="flex min-h-screen" v-if="active != '/'">
    <aside class="flex flex-col justify-between w-64 border-r px-4">
      <div>
        <h1 class="text-2xl font-bold p-4">DASH</h1>
        
        <nav aria-label="Основное меню">
          <ul class="space-y-2">
            <li v-for="{img, title, type } in menuItems"  >
              <div v-if="type === 'section'" class="pt-4 mt-4 border-t">
                <NuxtLink :to="`/${img}`" class="flex gap-3 items-center p-3 text-gray-500 hover:bg-gray-100 rounded-lg group">
                  <img :src="`${img}.png`" :alt="title" class="w-5 h-5">
                  <span class="group-hover:text-blue-400">{{ title }}</span>
                </NuxtLink>
              </div>
              
              <NuxtLink :to="`/${img}`" v-else class="flex gap-3 items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg group">
                <img  :src="`${img}.png`" :alt="title" class="w-5 h-5 ">
                <span class="group-hover:text-blue-400">{{ title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="pb-4" >
        <div @click="showLogoutModal = true" class="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
          <img :src="`profile.png`" alt="Профиль пользователя" class="w-10 h-10 rounded-full">
          <div>
            <p class="font-medium">NaN</p>
            <p class="text-sm text-gray-500">Nan@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 p-8 bg-gray-50">
        <div 
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showLogoutModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Выход из аккаунта</h3>
        <p class="text-gray-600 mb-6">Вы уверены, что хотите выйти из аккаунта?</p>
        
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 text-gray-500 hover:text-gray-700"
            @click="showLogoutModal = false"
          >
            Отмена
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            @click="handleLogout"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
      <slot></slot>
    </main>
  </div>
</template>
<style scoped>

</style>