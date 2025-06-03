<template>
    
  <NuxtLink :to="`create`"
    class="max-w-xs p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer"
  >
    <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
      <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </div>
    
    <h3 class="text-lg font-semibold text-gray-800 mb-1 text-center">Создать новую задачу</h3>
    
    <p class="text-sm text-gray-500 text-center mb-4">
      Нажмите, чтобы начать создание новой карточки задачи
    </p>
    
    <div class="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
      + Новая задача
    </div>
  </NuxtLink>
</template>
