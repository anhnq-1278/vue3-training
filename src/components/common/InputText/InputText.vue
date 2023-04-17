<template>
  <input
    :class="[
      'border border-grey-dc focus:outline-none',
      { 'border border-red-500': props.hasError }
    ]"
    :type="props.inputType"
    :placeholder="props.placeholder"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  hasError: { type: Boolean, default: false },
  inputType: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
})
</script>

<style scoped lang="scss"></style>
