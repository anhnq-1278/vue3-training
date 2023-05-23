<template>
  <input
    class="bg-gray-50 border border-solid border-gray-300 text-gray-500 text-sm rounded-lg block w-full px-4 py-2 focus:outline-none focus-visible:gray-300 placeholder:text-[#b1b5bd] disabled:bg-gray-300 disabled:text-black"
    type="text"
    v-model="value"
    v-bind="$attrs"
  />
  <span class="error-message">
    {{ errorMessage }}
  </span>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

interface IProps {
  modelValue: string
  name: string
  rules?: string
}

const props = defineProps<IProps>()

const { value, errorMessage } = useField<string>(props.name, props.rules, {
  validateOnValueUpdate: false
})
</script>
