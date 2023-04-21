<template>
  <!-- Render inside our `<div id="modals"></div>` in index.html -->
  <Teleport to="#modals">
    <div v-if="$attrs.show" class="">
      <div class="fixed inset-0 bg-gray-900 opacity-40"></div>
      <div class="fixed inset-0 flex items-center justify-center">
        <div :style="{ width: props.width }" class=" text-black h-auto">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '640px'
  }
})
</script>
