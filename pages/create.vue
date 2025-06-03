<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import auth from '~/middleware/auth';
import { io } from "socket.io-client"

definePageMeta({
    middleware: ["auth"]
})

const socket = io("http://localhost:3001")
const taskTitle = ref('');
const taskDescription = ref('');
const selectedCategory = ref('Домашние дела');
const categories = ref(['Домашние дела', 'Учеба', 'Стажировка/Курсы']);
const requirements = ref([]);
const newRequirement = ref('');
const dueDate = ref('');
const selectedDifficulty = ref('Средняя');
const difficultyLevels = ref(['Лёгкая', 'Средняя', 'Сложная']);
const selectedFile = ref(null);
const fileInput = ref(null);
const authStore = useAuthStore()


onMounted(()=> {
  socket.on('task-success', (response) => {
    console.log(response.data); // Данные задачи
    authStore.pushTask(response.data._id)

  });
})




const addRequirement = () => {
  if (newRequirement.value.trim()) {
    requirements.value.push({
      title: newRequirement.value,
      completed: false
    });
    newRequirement.value = '';
  }
};

const removeRequirement = (index) => {
  requirements.value.splice(index, 1);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 10 * 1024 * 1024) {
    selectedFile.value = file;
  } else {
    alert('Пожалуйста, выберите файл размером не более 10MB');
    event.target.value = '';
  }
};

const createTask = async () => {
  const taskData = {
    title: taskTitle.value,
    category: selectedCategory.value,
    description: taskDescription.value,
    quest: requirements.value,
    dueDate: dueDate.value,
    difficulty: selectedDifficulty.value,
    createdBy: authStore.getInfo()._id
  };

  console.log(taskData.quest)

  socket.emit('create-task', taskData);

  resetForm();

  await navigateTo('/tasks')
};

const resetForm = () => {
  taskTitle.value = '';
  taskDescription.value = '';
  selectedCategory.value = 'Домашние дела';
  requirements.value = [];
  newRequirement.value = '';
  dueDate.value = '';
  selectedDifficulty.value = 'Средняя';
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>
<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">Создание новой задачи</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Название задачи</label>
          <input 
            type="text" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите название задачи"
            v-model="taskTitle"
          >
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Категория</label>
          <select 
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="selectedCategory"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Описание задачи</label>
          <textarea 
            class="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Подробное описание задачи"
            v-model="taskDescription"
          ></textarea>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Основные требования</label>
          <div class="space-y-3">
            <div 
              v-for="(requirement, index) in requirements" 
              class="flex items-center"
            >
              <input 
                type="checkbox" 
                class="mr-3 h-5 w-5 text-blue-600"
                v-model="requirement.completed"
              >
              <span class="flex-1">{{ requirement.title }}</span>
              <button 
                @click="removeRequirement(index)"
                class="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                class="mr-3 h-5 w-5 text-blue-600 invisible"
                disabled
              >
              <input 
                type="text" 
                class="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Добавить новое требование"
                v-model="newRequirement"
                @keyup.enter="addRequirement"
              >
              <button 
                @click="addRequirement"
                class="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <button 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="createTask"
          >
            Создать задачу
          </button>
          <button 
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            @click="resetForm"
          >
            Отмена
          </button>
        </div>
      </div>

      <div>
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Изображение задачи</label>
          <div 
            class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition"
            @click="triggerFileInput"
          >
            <div class="mb-3">
              <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p class="text-gray-500">
              <span class="text-blue-600">Выберите файл</span>
              <input 
                type="file" 
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handleFileUpload"
              >
            </p>
            <p v-if="selectedFile" class="text-sm text-green-500 mt-1">
              Выбран файл: {{ selectedFile.name }}
            </p>
            <p v-else class="text-sm text-gray-400 mt-1">
              PNG, JPG, GIF до 10MB
            </p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-5 rounded-lg">
          <h3 class="font-medium text-gray-700 mb-3">Дополнительные настройки</h3>
          
          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Срок выполнения</label>
            <input 
              type="date" 
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              v-model="dueDate"
            >
          </div>
              
          <div>
            <label class="block text-gray-600 text-sm mb-1">Сложность</label>
            <div class="flex space-x-4">
              <button 
                v-for="difficulty in difficultyLevels" 
                class="px-3 py-1 rounded transition"
                :class="{
                  'bg-blue-100 text-blue-700 border border-blue-300': selectedDifficulty === difficulty,
                  'bg-gray-200 text-gray-700 hover:bg-gray-300': selectedDifficulty !== difficulty
                }"
                @click="selectedDifficulty = difficulty"
              >
                {{ difficulty }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

