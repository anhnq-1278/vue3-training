<template>
  <div class="flex flex-col">
    <span class="uppercase text-pink-8 font-bold mb-1 block" v-show="!!title">{{ title }}</span>
    <input
      :class="[
        `input-field w-full h-[50px] border rounded focus-visible:outline-none px-4 text-lg ${
          !!errorMessage || isError ? 'border-red-700' : 'border-pink-e4 text-pink-8'
        } ${disable ? '!bg-gray-300 text-gray-700 cursor-not-allowed !border-none' : 'bg-pink-f6'}`
      ]"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      v-model="inputValue"
      :disabled="disable"
    />
    <div class="min-h-[30px]">
      <p v-if="!!errorMessage" class="text-sm ml-3 text-red-700 italic mt-[2px]">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, watchEffect } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: { type: String, default: 'text' },
  value: { type: String, default: '' },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  isError: { type: Boolean, default: false },
  errorMsg: { type: String, default: '' },
  title: { type: String, default: '' },
  disable: { type: Boolean, default: false },
  modelValue: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: String): void
}>()

watchEffect(() => nextTick(() => emit('update:modelValue', inputValue.value)))

const { value: inputValue, errorMessage } = useField(props.name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false
})
</script>
