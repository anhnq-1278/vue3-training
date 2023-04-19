<template>
  <input
    :class="[
      'focus:outline-none',
      `${
        !!props.error || !!errorMessage
          ? 'border border-red-500 bg-red-fd'
          : 'border border-grey-dc bg-blue-e8'
      }`
    ]"
    :type="inputType"
    :placeholder="placeholder"
    :value="value"
    :name="name"
    v-bind="$attrs"
    @input="handleChange"
  />
  <p class="text-red-500 break-words mt-1" v-if="!!errorMessage || !!error">
    {{ errorMessage || error }}
  </p>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  error: { type: String, default: '' },
  inputType: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  name: { type: String, required: true },
  value: { type: String, default: '' }
})
const name = toRef(props, 'name')

const {
  handleChange,
  errorMessage
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style scoped lang="scss"></style>
