<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();
const taskId = route.params.id;
const task = ref({});


const completedSteps = computed(() => {
  if (!task.value.quest) return 0;
  return task.value.quest.filter(step => step.completed).length;
});

const totalSteps = computed(() => {
  if (!task.value.quest) return 0;
  return task.value.quest.length;
});

const progressPercentage = computed(() => {
  if (totalSteps.value === 0) return 0;
  return Math.round((completedSteps.value / totalSteps.value) * 100);
});

const deleteTask = async () => {
  try {
    const fetchedTask = await $fetch("/api/deleteTask", {
      method: 'POST',
      body: { _id: taskId }
    });

    if(fetchedTask) {
      await navigateTo('/home')
    }

  } catch (error) {
    console.error('Ошибка при удаление задачи:', error);
  }
}


const formatDate = (dateString) => {
  if (!dateString) return 'Не указано';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Неверная дата';
    
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date); // как понял не работает, попробовал
  } catch {
    return 'Ошибка формата';
  }
};

const loadTask = async () => {
  try {
    const fetchedTask = await $fetch("/api/findTask", {
      method: 'POST',
      body: { _id: taskId }
    });
    task.value = fetchedTask;
  } catch (error) {
    console.error('Ошибка при загрузке задачи:', error);
  }
};

onMounted(loadTask);
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ task.title }}</h1>
        <div class="mt-2">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {{ task.category }}
          </span>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button @click="editTask" class="p-2 text-gray-500 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button @click="deleteTask" class="p-2 text-gray-500 hover:text-red-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>


    <div class="mb-8">
      <div class="mb-6">
        <img :src="`default.png`" alt="Task image" class="w-full h-64 object-cover rounded-lg shadow">
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-gray-700 whitespace-pre-line">{{ task.description }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Этапы выполнения</h2>
      <div class="space-y-3">
        <div 
          v-for="(step, index) in task.quest" 
          class="flex items-center p-3 bg-white border rounded-lg shadow-sm hover:shadow transition-shadow"
          :class="{'border-green-200 bg-green-50': step.completed}"
        >
          <input 
            type="checkbox" 
            v-model="step.completed"
            class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          >
          <span 
            class="ml-3 text-gray-700 flex-1"
            :class="{'line-through text-gray-500': step.completed}"
          >
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Сложность</h3>
        <div class="flex items-center">
          <span 
            class="text-lg font-semibold"
            :class="{
              'text-green-600': task.difficulty === 'Лёгкая',
              'text-yellow-600': task.difficulty === 'Средняя',
              'text-red-600': task.difficulty === 'Сложная'
            }"
          >
            {{ task.difficulty }}
          </span>
        </div>
      </div>
      
      <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-sm font-medium text-gray-500 mb-1">Срок выполнения</h3>
      <p class="text-lg font-semibold text-gray-800">
        {{ formatDate(task.dueDate) }}
      </p>
    </div>
    
    <div class="bg-gray-50 p-4 rounded-lg">
  <h3 class="text-sm font-medium text-gray-500 mb-1">Прогресс</h3>
  <div class="flex items-center">
    <div class="w-full bg-gray-200 rounded-full h-2.5 mr-3">
      <div 
        class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
    <div class="flex-shrink-0 text-sm font-medium text-gray-700 whitespace-nowrap">
      {{ completedSteps }} из {{ totalSteps }}
    </div>
  </div>
</div>
  </div>

    <div class="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
      <div>
        Добавлено: -
      </div>
      <div>
        Автор: -
      </div>
    </div>
  </div>
</template>