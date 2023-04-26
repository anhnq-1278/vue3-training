<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="props.show">
        <div class="fixed inset-0 bg-gray-900 opacity-40"></div>
        <div class="fixed inset-0 flex items-center justify-center">
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
