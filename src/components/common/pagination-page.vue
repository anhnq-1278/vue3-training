<template>
  <div class="pagination flex justify-center items-center">
    <div
      class="w-12 rounded h-8 border flex justify-center items-center cursor-pointer"
      @click="handlePrev"
    >
      Prev
    </div>
    <div
      v-for="item in meta.totalPage"
      :key="item"
      :class="[
        'w-8 h-8 flex justify-center items-center cursor-pointer border',
        { 'bg-blue-50 text-blue-500 cursor-default': item === meta.page }
      ]"
      @click="emit('change-page', item)"
    >
      {{ item }}
    </div>
    <div
      class="w-12 rounded h-8 border flex justify-center items-center cursor-pointer"
      @click="handleNext"
    >
      Next
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TMeta } from '@/type/ListUsers'
import type { PropType } from 'vue'

const props = defineProps({
  meta: {
    type: Object as PropType<TMeta>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'change-page', page: number): void
}>()

function handlePrev() {
  if (props.meta.page === 1) return

  emit('change-page', props.meta.page - 1)
}

function handleNext() {
  if (props.meta.totalPage === props.meta.page) return

  emit('change-page', props.meta.page + 1)
}
</script>

<style scoped></style>
