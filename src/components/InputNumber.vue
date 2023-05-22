<template>
  <input
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    type="text"
    v-model="inputValue"
    @keypress="handleKeyPress"
  />
  <span class="text-red-700">
    {{ errorMessage }}
  </span>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { nextTick, watchEffect } from 'vue'

const props = defineProps(['modelValue', 'name', 'rules'])
const emit = defineEmits(['update:modelValue'])

watchEffect(() => {
  nextTick(() => emit('update:modelValue', inputValue.value))
})

const { value: inputValue, errorMessage } = useField(props.name, props.rules, {
  validateOnValueUpdate: false
})

const handleKeyPress = (event: KeyboardEvent) => {
  if (!event.key.match(/([0-9])+/)) event.preventDefault()
}
</script>
