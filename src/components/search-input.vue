<template>
  <div class="relative w-[600px] h-[40px]">
    <search-icon class="absolute left-3 w-[20px] h-[20px] z-10 top-[50%] mt-[-10px]" />
    <input
      type="text"
      class="w-full h-full border rounded focus-visible:outline-none pl-11 pr-4 text-lg"
      placeholder="Search user..."
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import searchIcon from '@/components/search-icon.vue'

const value = ref('')

const emit = defineEmits<{
  (e: 'change-search', value: string): void
}>()

watch(value, (value) => {
  emit('change-search', value)
})
</script>
