<template>
  <div class="radio-input-container flex gap-6">
    <div v-for="(option, index) of listOptions" :key="index" class="flex gap-1 items-center">
      <radio-input :checked="option.isChecked" @change="onChangeRadio(option.value)" />
      <span>{{ option.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import radioInput from '@/components/radio-input.vue'

const props = defineProps({
  options: {
    type: Array<{ value: string; label: string }>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const baseList = props.options.map((option) => {
  return { ...option, isChecked: false }
})

const listOptions = ref(baseList)

const onChangeRadio = (value: string) => {
  listOptions.value = props.options.map((option) => {
    return {
      ...option,
      isChecked: option.value === value ? true : false
    }
  })

  emit('change', value)
}
</script>
