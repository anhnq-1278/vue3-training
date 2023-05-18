<template><input type="text" v-model="value" @keypress="handleKeyPress" /></template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['change'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('change', value)
  }
})

const handleKeyPress = (event: KeyboardEvent) => {
  if (!event.key.match(/([0-9])+/)) event.preventDefault()
}
</script>
