<template>
  <div>
    <Teleport to="body">
      <transition name="fade">
        <div v-if="$attrs.show">
          <div class="fixed inset-0 bg-gray-900 opacity-40"></div>
          <div class="fixed inset-0 flex items-center justify-center">
            <div :style="{ width: props.width }" class="text-black h-auto">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '640px'
  }
})
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
