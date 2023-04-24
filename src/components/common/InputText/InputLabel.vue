<template>
  <div>
    <div class="mb-1">{{ props.name }}</div>
    <div>
      <slot name="input" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>
