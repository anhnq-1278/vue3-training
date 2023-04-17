<template>
  <div class="flex flex-col">
    <input
      :class="[
        `w-full h-[50px] bg-pink-f6 border rounded focus-visible:outline-none px-4 text-lg ${
          isError ? 'border-red-700' : 'border-pink-e4 text-pink-8'
        }`
      ]"
      v-bind="$attrs"
    />
    <div class="h-[30px]">
      <p v-if="isError" class="text-sm ml-3 text-red-700 italic mt-[2px]">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isError: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' }
})
</script>
