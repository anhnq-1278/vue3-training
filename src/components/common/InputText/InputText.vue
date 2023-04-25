<template>
  <input
    :class="[
      'focus:outline-none',
      'w-full',
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
import {type Ref, toRef, watch, computed } from 'vue'
import { useField } from 'vee-validate'

const emit = defineEmits<{
  (e: 'hasErrorValidate', data: boolean): void
}>()

const props = defineProps({
  error: { type: String, default: '' },
  inputType: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  name: { type: String, required: true },
  value: { type: String, default: '' }
})
const name = toRef(props, 'name')

const { handleChange, errorMessage = '' } = useField(name, undefined, {
  initialValue: props.value
})

watch(
  () => (<Ref<string | undefined>>errorMessage)?.value,
  (newErrorMessage) => {
    if (newErrorMessage) {
      emit('hasErrorValidate', true)
    } else {
      emit('hasErrorValidate', false)
    }
  }
)
</script>

<style scoped lang="scss"></style>
