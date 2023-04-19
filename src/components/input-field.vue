<template>
  <div class="flex flex-col">
    <input
      :class="[
        `w-full h-[50px] bg-pink-f6 border rounded focus-visible:outline-none px-4 text-lg ${
          !!errorMessage || isError ? 'border-red-700' : 'border-pink-e4 text-pink-8'
        }`
      ]"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
    />
    <div class="min-h-[30px]">
      <p v-if="!!errorMessage" class="text-sm ml-3 text-red-700 italic mt-[2px]">
        {{ errorMessage }}
      </p>
      <p v-if="meta.valid && isError" class="text-sm ml-3 text-red-700 italic mt-[2px]">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: { type: String, default: 'text' },
  value: { type: String, default: '' },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  isError: { type: Boolean, default: false },
  errorMsg: { type: String, default: '' }
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>
