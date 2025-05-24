<template>
  <div class="max-w-xs p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">

    <div class="mb-4 overflow-hidden rounded-lg">
      <img 
        class="w-full h-32 object-cover"
        :src="`image.png`" 
        alt="Creating Mobile App Design Preview"
      >
    </div>


    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-1">Creating Mobile App Design</h3>
      <p class="text-xs text-gray-500 uppercase tracking-wide">UI UX Design</p>
    </div>


    <div class="mb-4">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-600">Прогресс</span>
        <span class="font-medium text-blue-600">75%</span>
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
        class="w-5 h-5 opacity-75" 
        :src="`time.png`" 
        alt="Время создания"
      >
      <span>3 дня назад</span>
    </div>
  </div>
</template>