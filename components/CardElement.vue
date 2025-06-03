<script setup>

const props = defineProps({
_id: String,
title: String,
category: String,
img: String,
dueData: String
})

</script>
<template>
  <NuxtLink :to="_id" class="max-w-xs p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">

    <div class="mb-4 overflow-hidden rounded-lg">
      <img 
        class="w-full h-32 object-cover"
        :src="`default.png`" 
        alt="Creating Mobile App Design Preview"
      >
    </div>


    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-1">{{title}}</h3>
      <p class="text-xs text-gray-500 uppercase tracking-wide">{{ category }}</p>
    </div>


    <div class="mb-4">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-600">Прогресс</span>
        <span class="font-medium text-blue-600">-%</span>
      </div>
      <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-blue-600 rounded-full transition-all duration-500"
          :style="{ width: '75%' }"
        ></div>
      </div>
    </div>

    <div class="flex items-center gap-2 text-sm text-gray-500">
      <img 
        class="w-5 h-5 opacity-0" 
        :src="`time.png`" 
        alt="Время создания"
      >
      <span>{{ dueData }}</span>
    </div>
  </NuxtLink>
</template>