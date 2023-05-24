<template>
  <div class="flex flex-col">
    <span class="text-[#111928] font-medium mb-[8px] block" v-show="!!title">{{ title }}</span>
    <input
      :class="[
        `input-field w-full bg-[#F9FAFB] h-[37px] border border-[#D1D5DB] rounded-lg focus-visible:outline-none py-2 px-4 text-[14px] font-normal leading-[21px] ${
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
    <div v-if="!!errorMessage" class="min-h-[30px]">
      <p class="text-sm ml-3 text-red-700 italic mt-[2px]">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const { value: inputValue, errorMessage } = useField(props.name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false
})
</script>
