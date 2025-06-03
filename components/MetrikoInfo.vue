<script setup>

const props = defineProps({
  tasks: Array
})

const activityData = [ // не реализовал 
  { label: 'Пн', value: 8 },
  { label: 'Вт', value: 5 },
  { label: 'Ср', value: 6 },
  { label: 'Чт', value: 9 },
  { label: 'Пт', value: 7 },
  { label: 'Сб', value: 4 },
  { label: 'Вс', value: 2 }
];
</script>
<template>
  <div class="container mx-auto p-6">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm ">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Всего задач</p>
            <p class="text-3xl font-bold text-gray-800">{{ tasks.length}}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4">
          <div class="h-1 bg-gray-200 rounded-full">
            <div class="h-1 bg-green-600 rounded-full w-3"></div>
          </div>
        </div>
      </div>

      <div class="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Активность за неделю</h3>
        <div class="flex items-end justify-between h-40">
          <div v-for="(day, index) in activityData" :key="index" 
               class="flex-1 mx-1 bg-blue-100 rounded-t-lg hover:bg-blue-200 transition-colors"
               :style="{ height: `${day.value * 10}%` }">
            <div class="text-center text-xs text-gray-600 mt-2">
              {{ day.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
