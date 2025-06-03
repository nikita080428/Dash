<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
definePageMeta({
    middleware: ["noauth"]
})

const authStore = useAuthStore();
const router = useRouter();
const isLogin = ref(true)
const email = ref('')
const nickname = ref('')
const password = ref('')
const repeatPassword = ref('')

const passwordMatchError = computed(() => {
  if (repeatPassword.value && password.value !== repeatPassword.value) {
    return 'Пароли не совпадают'
  }
  return null
})

async function registration() {
  try{
    const data = await $fetch('api/createUser', {
        method: 'POST',
        body: {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
        }
    })
    console.log(email.value)
    if(data) {
      authStore.authenticated(data)
      await navigateTo('/home')
    }
  } catch{
    return null
  }
  
}
async function authorization() {
  try{
    const data = await $fetch('api/user', {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
        }
    })
    console.log(email.value)
    if(data) {
      authStore.authenticated(data)
      await navigateTo('/home')
    }
  } catch{
    return null
  }
}
</script>

<template>
  <main>
    <section class="max-w-md w-full mx-4 md:mx-auto my-8 p-8 rounded-xl bg-white shadow-lg">
      <div class="flex justify-center">
        <img :src="`star.png`" alt="Лого" class="w-20 h-20">
      </div>
      
      <!-- Форма авторизации -->
      <form v-if="isLogin" class="flex flex-col gap-8 w-full" @submit.prevent="authorization">
        <h1 class="text-3xl font-bold text-center">Вход</h1>
        
        <div class="space-y-6">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium">Почта</label>
            <input 
              type="email" 
              id="email"
              v-model="email"
              class="input-field border p-2 rounded"
              placeholder="mail@example.com"
              required
            >
          </div>

          <div class="flex flex-col gap-2">
            <label for="password" class="font-medium">Пароль</label>
            <input 
              type="password" 
              id="password"
              v-model="password"
              class="input-field border p-2 rounded"
              placeholder="Ваш пароль"
              required
            >
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <button class="p-2 bg-black rounded-xl text-white">
            Войти
          </button>
          
          <button 
            type="button" 
            class="text-gray-600 hover:text-black transition-colors"
            @click="isLogin = false"
          >
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>
      </form>

      <!-- Форма регистрации -->
      <form v-else class="flex flex-col gap-8 w-full" @submit.prevent="registration">
        <h1 class="text-3xl font-bold text-center">Регистрация</h1>
        
        <div class="space-y-6">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-medium">Почта</label>
            <input 
              type="email" 
              id="email"
              v-model="email"
              class="input-field border p-2 rounded"
              placeholder="mail@example.com"
              required
            >
          </div>

          <div class="flex flex-col gap-2">
            <label for="nickname" class="font-medium">Никнейм</label>
            <input 
              type="text" 
              id="nickname"
              v-model="nickname"
              class="input-field border p-2 rounded"
              placeholder="murzik"
              required
            >
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label for="password" class="font-medium">Пароль</label>
              <input 
                type="password" 
                id="password"
                v-model="password"
                class="input-field border p-2 rounded"
                placeholder="Не менее 8 символов"
                required
              >
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="repeat-password" class="font-medium">Подтвердите пароль</label>
              <input 
                type="password" 
                id="repeat-password"
                v-model="repeatPassword"
                class="input-field border p-2 rounded"
                :class="{ 'border-red-500': passwordMatchError }"
                placeholder="Повторите пароль"
                required
              >
              <div v-if="passwordMatchError" class="text-red-500 text-sm">
                {{ passwordMatchError }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <button 
            class="p-2 bg-black rounded-xl text-white disabled:opacity-50"
            :disabled="!!passwordMatchError"
          >
            Зарегистрироваться
          </button>
          
          <button 
            type="button" 
            class="text-gray-600 hover:text-black transition-colors"
            @click="isLogin = true"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </form>
    </section>
  </main>
</template>