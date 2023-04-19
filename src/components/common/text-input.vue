<template>
  <div class="flex flex-col gap-1 mt-3">
    <label class="text-[#45f3ff]" :for="name">{{ $attrs.label }}</label>
    <input v-model="inputValue" :name="name" v-bind="$attrs" class="bg-[#45f3ff]" />
    <p class="text-[#c7082e] text-xs" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const { value: inputValue, errorMessage } = useField(props.name, undefined, {
  validateOnValueUpdate: false
})
</script>

<style lang="scss" scoped>
input {
  outline: none;
  border-radius: 8px;
  height: 40px;
  padding: 5px;
}
</style>
